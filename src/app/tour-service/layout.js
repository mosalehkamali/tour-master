import TourServicesNav from "@/components/templates/tour-service/nav/Navbar"
export const metadata = {
  title: "صاحب الزمان (عج)",
  description: "کاروان زیارتی صاحب الزمان محی آباد کرمان",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body style={{paddingTop:"3rem"}} suppressHydrationWarning={true}>
        <TourServicesNav/>
        {children}
      </body>
    </html>
  );
}
