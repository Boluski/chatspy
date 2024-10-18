import { Group, Avatar, Title, TextInput, DEFAULT_THEME } from "@mantine/core";
import { useContext } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { UserContext } from "../contexts/userContext";

type WorkspaceHeaderProps = {
  workspaceDrawOpen: () => void;
};
export default function WorkspaceHeader({
  workspaceDrawOpen,
}: WorkspaceHeaderProps) {
  const { fullName, currentWorkspace } = useContext(UserContext);

  return (
    <Group
      style={{ borderBottom: `solid 2px ${DEFAULT_THEME.colors.dark[0]}` }}
      py={5}
    >
      <Group
        gap={5}
        style={{ cursor: "pointer" }}
        onClick={() => {
          workspaceDrawOpen();
        }}
      >
        <Avatar
          name={currentWorkspace?.name}
          size={"lg"}
          radius={"lg"}
          styles={{ placeholder: { fontSize: "2rem" } }}
        />
        <Title c={"dark.6"}>{currentWorkspace?.name}</Title>
      </Group>
      <TextInput
        style={{ flexGrow: "1" }}
        size="lg"
        placeholder="Search Anything"
        leftSection={<IoSearchSharp size={"1.7rem"} />}
      />
      <Avatar name={fullName} size={"lg"} />
    </Group>
  );
}
