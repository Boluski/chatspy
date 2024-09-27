import { Stack, TextInput, Button } from "@mantine/core";

export default function CreateWorkspaceModal() {
  return (
    <Stack w={"100%"}>
      <TextInput
        styles={{ label: { fontWeight: "bold", fontSize: "1.3rem" } }}
        label={"Name:"}
        size="md"
      />
      <Button size="md" color="violet.8">
        Create Workspace
      </Button>
    </Stack>
  );
}
