import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { APP_NAME } from "@/lib/constants";
import { THEME_BOOT_SCRIPT } from "@/lib/theme";

const PREVIEW = process.env.NEXT_PUBLIC_PREVIEW === "1";

export const metadata: Metadata = {
  title: { default: APP_NAME, template: `%s · ${APP_NAME}` },
  description: "A small daily feed for friends. Record a track, reply, and save what you like.",
  applicationName: APP_NAME,
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const page = (
    <html lang="en" data-mode="light" data-theme="ultramarine" data-density="comfortable" data-text="normal" data-motion="on" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70] focus:bg-ink focus:px-4 focus:py-3 focus:text-paper">Skip to content</a>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
  return PREVIEW ? page : <ClerkProvider>{page}</ClerkProvider>;
}
