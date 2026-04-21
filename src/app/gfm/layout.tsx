import DashboardLayout from "@/components/layout/DashboardLayout";

export default function GFMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
