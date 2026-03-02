import { auth } from "@/lib/auth";
import { getCurrentUser } from "@/lib/authUtils";
import { headers } from "next/headers";

// Protected behind authentication
async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    return <h1 className="mt-10 text-center">Du må logge inn!</h1>;
  }

  return (
    <div className="text-center mt-10">
      <h1>Du er nå på DashboardPage</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

export default DashboardPage;
