import { getUserByUsername } from "@/actions/user";
import { redirectIfNotCorrectUsername } from "@/lib/authUtils";

async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  await redirectIfNotCorrectUsername(username);

  const userData = await getUserByUsername(username);

  return (
    <div className="text-center mt-10">
      <h1>ProfilePage</h1>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  );
}

export default ProfilePage;
