import Dashboard from "./components/strcture";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: "Dashboard | Realtime Result",
  description: "Manage and organize your tasks the way you want",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/todo/recent?user=${session?.user?.email}&limit=6`,
    { cache: "no-store" },
  );

  const data = await result.json();

  const recentTasks = data.result ?? [];

  return (
    <div>
      <Dashboard recentTasks={recentTasks} todayCount={data.todayDone} />
    </div>
  );
}
