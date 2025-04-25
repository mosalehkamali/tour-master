"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const cookies = document.cookie.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {});

    if (!cookies.authToken) {
      router.push("/p-admin/admin-auth");
    }
  }, []);

  return (
    <html lang="fa">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
