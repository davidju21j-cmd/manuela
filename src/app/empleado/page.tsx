import { DashboardGuard } from "@/components/dashboard/DashboardGuard";
import { EmployeeDashboard } from "@/components/dashboard/EmployeeDashboard";

export const metadata = {
  title: "Panel empleado",
};

export default function EmpleadoPage() {
  return (
    <DashboardGuard allowedRoles={["empleado", "admin"]}>
      <EmployeeDashboard />
    </DashboardGuard>
  );
}
