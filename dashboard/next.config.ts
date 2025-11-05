import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // Génère une version statique
  distDir: 'dist',   // Place le build dans le dossier dist
  images: {
    unoptimized: true // Nécessaire pour l'export statique
  }
};

export default nextConfig;
