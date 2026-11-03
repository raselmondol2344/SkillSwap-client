import ClientTaskTable from "@/app/component/ClientTaskTable";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
 export const instant = false;

export default async function MyTaskPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
   
  });

  const user = session?.user;

  if (!user?.id) {
    return <div>Please login first</div>;
  }

  const res = await fetch(
    `http://localhost:8000/client-tasks/${user.id}`,
    {
      cache: "no-store",
    }
  );

  const taskData = await res.json();

  return (
    <div className="mx-auto w-full max-w-5xl px-3 py-6 sm:px-5 lg:px-6">
      <ClientTaskTable data={taskData} />
    </div>
  );
}