import { getUserByUsername } from "@/actions/user";
import { redirectIfNotCorrectUsername } from "@/lib/authUtils";
import ColorForm from "./_components/ColorForm";

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
      <h1>[userData?.username]</h1>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
      {userData && <ColorForm user={userData} />}
    </div>
  );
}

export default ProfilePage;
