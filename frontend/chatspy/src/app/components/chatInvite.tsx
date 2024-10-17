import { Stack, Title, Button } from "@mantine/core";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { useMutation } from "@apollo/client";
import { gql } from "@/__generated__/gql";
import { ChannelType } from "@/__generated__/graphql";
import { useContext } from "react";
import { ChatContext } from "../contexts/chatContext";

const CREATE_DIRECT_MESSAGE = gql(`
    mutation CreateChannelDM($input: CreateChannelInput!) {
  createChannel(input: $input) {
    channel {
      id
      name
      type
      users {
        fullName
        username
      }
      # messages {
      #   id
      #   text
      #   date
      #   threads {
      #     id
      #     text
      #     date
      #   }
      # }
    }
  }
}
    `);

type ChatInviteProps = {
  inviteFullName: string;
  username: string;
  inviteUsername: string;
  workspaceId: string;
};
function ChatInvite({
  inviteFullName,
  inviteUsername,
  username,
  workspaceId,
}: ChatInviteProps) {
  const { setChannels, setUsernameDmChannels } = useContext(ChatContext);
  const [createDM] = useMutation(CREATE_DIRECT_MESSAGE);

  return (
    <Stack w={"100%"} h={"100%"} justify="center" align="center" gap={40}>
      {/* <Group gap={10}>
    
      </Group> */}
      <Stack align="center" gap={2}>
        <Title fz={"2.5rem"}>Start a conversation with</Title>
        <Title c={"violet.8"}>{inviteFullName}</Title>
      </Stack>

      <Button
        size="xl"
        bg={"violet.8"}
        leftSection={<HiOutlineChatBubbleLeftRight size={"1.8rem"} />}
        onClick={handleInvite}
      >
        Chat Now
      </Button>
    </Stack>
  );

  async function handleInvite() {
    try {
      const { data } = await createDM({
        variables: {
          input: {
            directUsername: inviteUsername,
            rootUsername: username,
            name: `${username}-${inviteUsername}`,
            type: ChannelType.Direct,
            workspaceId: workspaceId,
          },
        },
      });
      if (data) {
        setChannels((prevChannels) => {
          const newChannels = [...prevChannels];

          if (data.createChannel.channel) {
            newChannels.push({
              id: data.createChannel.channel.id,
              name: data.createChannel.channel.name,
              type: "DIRECT",
              users: data.createChannel.channel.users,
              message: [],
            });
          }

          return newChannels;
        });

        setUsernameDmChannels((prevUDC) => {
          const newUDC = [...prevUDC];

          newUDC.push({
            username: inviteUsername,
            channelId: data.createChannel.channel?.id,
          });
          return newUDC;
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default ChatInvite;
