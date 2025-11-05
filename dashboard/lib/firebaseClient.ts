import { auth as defaultAuth, analytics as defaultAnalytics } from "../firebase/config";
import { connectAuthEmulator } from "firebase/auth";
import { Analytics, logEvent } from "firebase/analytics";

const useEmulator = process.env.NEXT_PUBLIC_FIREBASE_EMULATOR === "true";

export const auth = defaultAuth;
export const analytics = defaultAnalytics;

// Helper function to safely log analytics events
export const logAnalyticsEvent = (eventName: string, eventParams?: { [key: string]: any }) => {
  if (typeof window !== "undefined" && analytics) {
    logEvent(analytics as Analytics, eventName, eventParams);
  }
};

if (typeof window !== "undefined" && useEmulator) {
  // Expect NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST like 'http://localhost:9099'
  const url = process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST || "http://localhost:9099";
  try {
    connectAuthEmulator(auth, url);
    console.info("Connected Firebase Auth emulator:", url);
  } catch (err) {
    // ignore if already connected
    console.warn("Could not connect to auth emulator", err);
  }
}

export default auth;
