import { Avatar, Button, Group, Stack, Title } from "@mantine/core";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";

type UserAccountPopOverProps = {
  fullName: string;
  username: string;
  email: string;
  userSettingOpen: () => void;
};
function UserAccountPopOver({
  fullName,
  username,
  email,
  userSettingOpen,
}: UserAccountPopOverProps) {
  const router = useRouter();
  return (
    <Stack>
      <Title>{fullName}</Title>
      <Group>
        <Avatar name={fullName} size={"xl"} />
        <Stack gap={5}>
          <Title size={"1.5rem"}>{username}</Title>
          <Title size={"1.5rem"}>{email}</Title>
        </Stack>
      </Group>
      <Stack gap={5}>
        <Button
          leftSection={<IoSettingsOutline size={"1.2rem"} />}
          size="md"
          variant="subtle"
          color="violet.8"
          onClick={() => {
            userSettingOpen();
          }}
        >
          Account Settings
        </Button>
        <Button
          size="md"
          color="violet.8"
          onClick={handleSignOut}
          leftSection={<LuLogOut size={"1.2rem"} />}
        >
          Sign Out
        </Button>
      </Stack>
    </Stack>
  );

  async function handleSignOut() {
    try {
      await signOut();
      localStorage.removeItem("lastVisitedWorkspace");
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserAccountPopOver;
