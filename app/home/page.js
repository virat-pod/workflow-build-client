import Home from "./components/home";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const page = async () => {
  const session = await getServerSession(authOptions);

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/todo?user=${session?.user?.email}`, {cache: "no-store"},
  );

  const data = await result.json();
  const task = data.result || [];

  const completedTask = task.filter((t) => t.completed)

  return (
    <div>
      <Home Alltasks={task} completedTodayTask={completedTask} />
    </div>
  );
};

export default page;
