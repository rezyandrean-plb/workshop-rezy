import AdminHeader from "@/components/AdminHeader";
import AdminFooter from "@/components/AdminFooter";
import { ToastProvider } from "@/components/Toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <AdminHeader />
      <main className="flex-1">{children}</main>
      <AdminFooter />
    </ToastProvider>
  );
}
