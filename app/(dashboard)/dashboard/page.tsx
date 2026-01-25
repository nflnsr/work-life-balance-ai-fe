import { Sidebar } from "@/components/sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { MainContent } from "./_components/main-content";

export default function Dashboard() {
  return (
    <div className="min-h-[100svh] max-w-screen bg-gray-50 lg:flex lg:flex-row">
      <Sidebar />
      <div className="h-screen min-h-screen w-full lg:h-auto">
        <DashboardHeader />
        <MainContent />
      </div>
    </div>
  );
}
