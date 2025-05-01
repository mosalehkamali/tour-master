// ۱. اینجا یک Server Component است
export const dynamic = "force-dynamic";
export const revalidate = 0;  

import ReceiptPage from "@/components/templates/p-admin/ReceiptPage";

export default function Page() {
  return <ReceiptPage />;
}
