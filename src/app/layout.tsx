"use client";

import type { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div
      style={{
        fontFamily: "var(--font-sunflower)",
        background: "var(--background)",
        color: "var(--text-dark)",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
};

export default RootLayout;
