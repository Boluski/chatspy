import { channelType } from "../contexts/chatContext";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { ChatContext } from "../contexts/chatContext";
import {
  TextInput,
  Stack,
  Title,
  Group,
  Avatar,
  Button,
  ScrollArea,
  Box,
} from "@mantine/core";
import { IoSearchSharp } from "react-icons/io5";
import { MdAdd, MdOutlineRemove } from "react-icons/md";
import { useMutation } from "@apollo/client";
import { gql } from "@/__generated__/gql";

const ADD_USER_TO_PRIVATE_CHANNEL = gql(`
    mutation AddUserToChannelWM($input: AddUserToChannelInput!) {
  addUserToChannel(input: $input) {
    channel {
      id
      name
      type
      users {
        fullName
        username
      }
    }
  }
}
    `);

const REMOVE_USER_FROM_PRIVATE_CHANNEL = gql(`
    mutation RemoveUserFromChannel($input: RemoveUserFromChannelInput!) {
  removeUserFromChannel(input: $input) {
    channel {
      id
      name
      type
      users {
        fullName
        username
      }
    }
  }
}`);

type AddMemberToChannelProps = {
  currentChannel: channelType | undefined;
  currentChannelIndex: number;
};

function AddMemberToChannel({
  currentChannel,
  currentChannelIndex,
}: AddMemberToChannelProps) {
  const { currentWorkspace } = useContext(UserContext);
  console.log("current channel", currentChannel);

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
                  let inChannel = false;
                  if (
                    currentChannel?.users.findIndex(
                      (cU) => cU.username == u.username
                    ) != -1
                  ) {
                    inChannel = true;
                  }
                  return (
                    <WorkspaceMember
                      key={u.username}
                      fullName={u.fullName}
                      username={u.username}
                      inChannel={inChannel}
                      currentChannel={currentChannel}
                      currentChannelIndex={currentChannelIndex}
                    />
                  );
                })}
          </Stack>
        </ScrollArea>
      </Stack>
    </Stack>
  );
}

type WorkspaceMemberProps = {
  fullName: string;
  username: string;
  inChannel: boolean;
  currentChannel: channelType | undefined;
  currentChannelIndex: number;
};
function WorkspaceMember({
  fullName,
  username,
  inChannel,
  currentChannel,
  currentChannelIndex,
}: WorkspaceMemberProps) {
  const [userInChannel, setUserInChannel] = useState(inChannel);
  const [addUserToChannel] = useMutation(ADD_USER_TO_PRIVATE_CHANNEL);
  const [removeUserFromChannel] = useMutation(REMOVE_USER_FROM_PRIVATE_CHANNEL);
  const { setChannels } = useContext(ChatContext);

  return (
    <Group align="center">
      <Avatar size={"lg"} name={fullName} />
      <Title order={3} style={{ flexGrow: 1 }}>
        {fullName}
      </Title>
      <Box w={"10rem"}>
        {userInChannel ? (
          <Button
            w={"100%"}
            size="lg"
            color="red"
            variant="outline"
            leftSection={<MdOutlineRemove size={"2rem"} />}
            onClick={() => {
              handleRemoveUser();
              setUserInChannel((prev) => !prev);
            }}
          >
            Remove
          </Button>
        ) : (
          <Button
            w={"100%"}
            size="lg"
            color="green"
            variant="outline"
            leftSection={<MdAdd size={"2rem"} />}
            onClick={() => {
              handleAddUser();
              setUserInChannel((prev) => !prev);
            }}
          >
            Add
          </Button>
        )}
      </Box>
    </Group>
  );

  async function handleAddUser() {
    const { data } = await addUserToChannel({
      variables: {
        input: { privateChannelId: currentChannel?.id, username: username },
      },
    });

    if (data) {
      setChannels((prevChannel) => {
        const updatedChannel = [...prevChannel];

        if (data.addUserToChannel.channel) {
          updatedChannel[currentChannelIndex].users =
            data.addUserToChannel.channel.users;
        }

        return updatedChannel;
      });
    }
  }

  async function handleRemoveUser() {
    const { data } = await removeUserFromChannel({
      variables: {
        input: { channelId: currentChannel?.id, username: username },
      },
    });

    if (data) {
      setChannels((prevChannel) => {
        const updatedChannel = [...prevChannel];

        if (data.removeUserFromChannel.channel) {
          updatedChannel[currentChannelIndex].users =
            data.removeUserFromChannel.channel.users;
        }

        return updatedChannel;
      });
    }
  }
}

export default AddMemberToChannel;
