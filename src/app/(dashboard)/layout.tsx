import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(222, 30%, 5%) 0%, hsl(222, 25%, 7%) 100%)" }}>
      <Sidebar />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
