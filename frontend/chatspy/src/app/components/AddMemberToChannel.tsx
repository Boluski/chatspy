import { channelType } from "../contexts/chatContext";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import {
  TextInput,
  Stack,
  Title,
  Group,
  Avatar,
  Button,
  ScrollArea,
} from "@mantine/core";
import { IoRemoveSharp, IoSearchSharp } from "react-icons/io5";
import { MdAdd, MdOutlineRemove } from "react-icons/md";

type AddMemberToChannelProps = {
  currentChannel: channelType | undefined;
};

function AddMemberToChannel({}: AddMemberToChannelProps) {
  const { currentWorkspace } = useContext(UserContext);
  return (
    <Stack>
      <TextInput
        size="lg"
        placeholder="Search Member"
        leftSection={<IoSearchSharp size={"1.7rem"} />}
      />
      <Stack>
        <Title order={2}>Members</Title>
        <ScrollArea h={"20rem"} type="never">
          <Stack gap={5}>
            {currentWorkspace &&
              currentWorkspace.users
                .filter((u) => u.username != currentWorkspace.createdBy)
                .map((u) => {
                  return <WorkspaceMember fullName={u.fullName} />;
                })}
          </Stack>
        </ScrollArea>
      </Stack>
    </Stack>
  );
}
type WorkspaceMemberProps = {
  fullName: string;
};
function WorkspaceMember({ fullName }: WorkspaceMemberProps) {
  return (
    <Group align="center">
      <Avatar size={"lg"} name={fullName} />
      <Title order={3} style={{ flexGrow: 1 }}>
        {fullName}
      </Title>
      {true ? (
        <Button
          size="lg"
          color="green"
          variant="outline"
          leftSection={<MdAdd size={"2rem"} />}
        >
          Add
        </Button>
      ) : (
        <Button
          size="lg"
          color="red"
          variant="outline"
          leftSection={<MdOutlineRemove size={"2rem"} />}
        >
          Remove
        </Button>
      )}
    </Group>
  );
}

export default AddMemberToChannel;
