import DashboardLayout from "@/components/layout/DashboardLayout";

export default function DACLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
