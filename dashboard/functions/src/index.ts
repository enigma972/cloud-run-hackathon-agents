/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { initializeApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

// Initialize Firebase Admin
const app = initializeApp();
const storage = getStorage(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

// Connect to emulators in development
if (process.env.FUNCTIONS_EMULATOR === 'true' || process.env.FIREBASE_EMULATOR_HUB) {
  // Firestore emulator
  if (process.env.FIRESTORE_EMULATOR_HOST) {
    firestore.settings({
      host: process.env.FIRESTORE_EMULATOR_HOST,
      ssl: false,
    });
  }
  // Auth et Storage: rien à faire côté code, juste les variables d'env
  // FIREBASE_AUTH_EMULATOR_HOST et FIREBASE_STORAGE_EMULATOR_HOST sont gérées automatiquement par le SDK Admin
  logger.info('Connected to Firebase emulators');
}

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create a new bot for the authenticated user
export const createBot = onRequest({ 
  cors: true,
  maxInstances: 10 
}, async (request, response) => {
  // Check HTTP method
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Check the authentication token
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      response.status(401).json({ error: 'Unauthorized - No token provided' });
      return;
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(idToken);
    const userId = decodedToken.uid;

    // Validate request body
    const { botName } = request.body;
    if (!botName || typeof botName !== 'string') {
      response.status(400).json({ error: 'Bot name is required' });
      return;
    }

    // Create or get the user's storage bucket
    const userBucketName = `user-${userId}-storage`.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const userBucket = storage.bucket(userBucketName);
    
    // Check if the bucket exists, if not create it
    const [bucketExists] = await userBucket.exists();
    if (!bucketExists) {
      await userBucket.create({
        location: 'us-central1',
        storageClass: 'STANDARD'
      });
      
      // Set IAM policy to allow only the user to access the bucket
      const bucketIamPolicy = {
        bindings: [{
          role: 'roles/storage.objectViewer',
          members: [`user:${decodedToken.email}`]
        }]
      };
      await userBucket.iam.setPolicy(bucketIamPolicy);
    }

    // Create bot folder structure (using a .keep file)
    const botFolderId = `${Date.now()}-${botName}`.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const botFolderPath = `bots/${botFolderId}`;
    await userBucket.file(`${botFolderPath}/.keep`).save('');

    // Create bot record in Firestore
    const botRef = await firestore.collection('bots').add({
      name: botName,
      admin_id: userId,
      status: 'pending',
      created_at: FieldValue.serverTimestamp(),
      folder_path: botFolderPath,
      bucket_name: userBucketName
    });

    logger.info(`Bot created successfully`, {
      botId: botRef.id,
      userId,
      bucket: userBucketName,
      folderPath: botFolderPath,
    });

    response.status(201).json({
      id: botRef.id,
      name: botName,
      status: 'pending',
      storage: {
        bucket: userBucketName,
        folder: botFolderPath,
      }
    });

  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    logger.error('Error creating bot:', error);
    response.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Create signed URLs for bot files upload/download
export const createSignedUrls = onRequest({ 
  cors: true,
  maxInstances: 10 
}, async (request, response) => {
    // Check HTTP method
    if (request.method !== 'POST') {
      response.status(405).json({ error: 'Method not allowed' });
      return;
    }
  
    try {
      // Check the authentication token
      const authHeader = request.headers.authorization;
      if (!authHeader?.startsWith('Bearer ')) {
        response.status(401).json({ error: 'Unauthorized - No token provided' });
        return;
      }
  
      const idToken = authHeader.split('Bearer ')[1];
      const decodedToken = await auth.verifyIdToken(idToken);
      const userId = decodedToken.uid;
  
      // Validate request body
      const { bucketName, filePaths } = request.body;
      if (!bucketName || typeof bucketName !== 'string' || !Array.isArray(filePaths)) {
        response.status(400).json({ error: 'Invalid request parameters' });
        return;
      }
  
      const userBucketName = `user-${userId}-storage`.toLowerCase().replace(/[^a-z0-9-]/g, '-');
      if (bucketName !== userBucketName) {
        response.status(403).json({ error: 'Forbidden - Access to bucket denied' });
        return;
      }
  
      const userBucket = storage.bucket(bucketName);
      // Generate signed URLs for each file path (provide both upload and download URLs)
      const urlPairs = await Promise.all(
        filePaths.map(async (filePath) => {
          const file = userBucket.file(filePath);
          // Upload URL (write)
          const [uploadUrl] = await file.getSignedUrl({
            version: 'v4',
            action: 'write',
            expires: Date.now() + 15 * 60 * 1000, // 15 minutes
            contentType: 'application/octet-stream',
          });
          // Download URL (read)
          const [downloadUrl] = await file.getSignedUrl({
            version: 'v4',
            action: 'read',
            expires: Date.now() + 15 * 60 * 1000, // 15 minutes
          });
          return { filePath, uploadUrl, downloadUrl };
        })
      );

      // Construct response object with signed URLs for each file
      const signedUrls: Record<string, { uploadUrl: string; downloadUrl: string }> = {};
      for (const { filePath, uploadUrl, downloadUrl } of urlPairs) {
        signedUrls[filePath] = { uploadUrl, downloadUrl };
      }

      response.status(200).json({ signedUrls });
  
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error(String(err));
      logger.error('Error creating signed URLs:', error);
      response.status(500).json({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
});
