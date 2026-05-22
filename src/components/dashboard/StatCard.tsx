import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: "mango" | "lime" | "blue" | "red";
}

const colors = {
  mango: "bg-mango-100 text-mango-600",
  lime: "bg-lime-100 text-lime-600",
  blue: "bg-blue-100 text-blue-600",
  red: "bg-red-100 text-red-600",
};

export function StatCard({ title, value, subtitle, icon: Icon, color = "mango" }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-stone-500">{title}</p>
          <p className="mt-1 text-2xl font-bold text-stone-900">{value}</p>
          {subtitle && (
            <p className="mt-1 text-xs text-stone-500">{subtitle}</p>
          )}
        </div>
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", colors[color])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
