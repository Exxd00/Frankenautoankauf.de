"use client";

import { useEffect } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import CookieConsent from "@/components/CookieConsent";
import FloatingButtons from "@/components/FloatingButtons";

export function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased";
  }, []);

  return (
    <ThemeProvider>
      <div className="antialiased">{children}</div>
      <FloatingButtons />
      <CookieConsent />
    </ThemeProvider>
  );
}
