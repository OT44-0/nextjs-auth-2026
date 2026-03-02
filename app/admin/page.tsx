import { requireAdmin } from "@/lib/authUtils";

async function AdminPage() {
  const user = await requireAdmin();

  return <div>AdminPage: Welcome {user.name}</div>;
}

export default AdminPage;
