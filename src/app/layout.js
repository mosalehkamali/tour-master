import "./globals.css";

export const metadata = {
  title: "صاحب الزمان (عج)",
  description: "کاروان زیارتی صاحب الزمان محی آباد کرمان",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
