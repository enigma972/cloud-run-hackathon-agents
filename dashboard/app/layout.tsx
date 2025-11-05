import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import AuthenticatedGate from "@/components/authenticated-gate";

export const metadata: Metadata = {
  title: "Create Your Own No-code ChatGPT Chatbot in Minutes",
  description: "Transform business communication in minutes with LussiA. Build No-Code Custom AI Chatbot, integrate live chat support & boost your sales!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased font-sans"
      >
        <AuthProvider>
          <AuthenticatedGate>{children}</AuthenticatedGate>
        </AuthProvider>
      </body>
    </html>
  );
}
