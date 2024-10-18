import { Avatar, Button, Group, Stack, Title } from "@mantine/core";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

type UserAccountPopOverProps = {
  fullName: string;
  username: string;
  email: string;
};
function UserAccountPopOver({
  fullName,
  username,
  email,
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
      <Button
        color="violet.8"
        onClick={async () => {
          await signOut();
          router.push("/login");
        }}
      >
        Sign Out
      </Button>
    </Stack>
  );
}

export default UserAccountPopOver;
