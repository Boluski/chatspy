import { Stack, Title, Group, Button, DEFAULT_THEME } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

type WorkspaceCardProps = {
  workspaceId: string;
  name: string;
};

export default function WorkspaceCard({
  workspaceId,
  name,
}: WorkspaceCardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <Stack
      style={{
        border: `solid 2px ${DEFAULT_THEME.colors.dark[0]}`,
        borderRadius: "0.5rem",
      }}
      p={10}
      bg={"gray.1"}
    >
      <Title c={"dark.6"}>{name}</Title>
      <Group justify={"flex-end"}>
        <Button
          loading={loading}
          variant="light"
          color="gray"
          size="md"
          onClick={() => {
            setLoading(true);
            router.push(`workspace/${workspaceId}`);
          }}
        >
          Open Workspace
        </Button>
      </Group>
    </Stack>
  );
}
