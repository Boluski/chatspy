import { Stack, Title, Group, Button, DEFAULT_THEME } from "@mantine/core";

export default function WorkspaceCard() {
  return (
    <Stack
      style={{
        border: `solid 2px ${DEFAULT_THEME.colors.dark[0]}`,
        borderRadius: "0.5rem",
      }}
      p={10}
      bg={"gray.1"}
    >
      <Title c={"dark.6"}>Spellblaze</Title>
      <Group justify={"flex-end"}>
        <Button variant="light" color="gray" size="md">
          Open Workspace
        </Button>
      </Group>
    </Stack>
  );
}
