import { DashboardGuard } from "@/components/dashboard/DashboardGuard";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";

export const metadata = {
  title: "Administración",
};

export default function AdminPage() {
  return (
    <DashboardGuard allowedRoles={["admin"]}>
      <AdminDashboard />
    </DashboardGuard>
  );
}
