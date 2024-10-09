import {
  Stack,
  Group,
  Avatar,
  Title,
  Text,
  Box,
  DEFAULT_THEME,
  ActionIcon,
} from "@mantine/core";
import { useContext } from "react";
import { ChatContext } from "../contexts/chatContext";
import { FiEdit } from "react-icons/fi";
import { RiChatDeleteLine } from "react-icons/ri";
import {
  SubscriptionResult,
  useMutation,
  useSubscription,
} from "@apollo/client";
import { gql } from "@/__generated__/gql";
import { OnMessageDeletedSubscription } from "@/__generated__/graphql";

const DELETE_MESSAGE = gql(`
    mutation DeleteMessage($input: DeleteMessageInput!) {
  deleteMessage(input: $input) {
    message {
      id
      text
      date
    }
  }
}
    `);
const ON_MESSAGE_DELETED_SUBSCRIPTION = gql(`
    subscription OnMessageDeleted($messageId: UUID!) {
  onMessageDeleted(messageId: $messageId) {
    id
  }
}
    `);

type MessageBoxProps = {
  channelIndex: number;
  messageId: string;
  messageIndex: number;
};
function MessageBox({
  messageId,
  channelIndex,
  messageIndex,
}: MessageBoxProps) {
  const { channels, setChannels, username, setMessageToEdit } =
    useContext(ChatContext);
  const currentMessage = channels[channelIndex].message.find(
    (m) => m.id == messageId
  );
  const isUser = currentMessage?.user.username == username;

  const dateString: string = currentMessage ? currentMessage.date : "";

  const currentDate = new Date(dateString);

  const [deleteMessage] = useMutation(DELETE_MESSAGE);
  useSubscription(ON_MESSAGE_DELETED_SUBSCRIPTION, {
    fetchPolicy: "network-only",
    variables: { messageId: currentMessage?.id },
    onData() {
      handleOnMessageDeleted();
    },
  });

  return (
    <Group wrap={"nowrap"} align={"start"} bg={isUser ? "violet.0" : ""} p={5}>
      <Avatar
        size={"lg"}
        name={currentMessage?.user.fullName}
        styles={
          isUser
            ? {
                root: { border: `2px solid ${DEFAULT_THEME.colors.violet[8]}` },
                placeholder: { color: DEFAULT_THEME.colors.violet[8] },
              }
            : {
                root: { border: `` },
                placeholder: { color: "" },
              }
        }
      />
      <Stack gap={2} w={"100%"}>
        <Group justify={"space-between"}>
          <Title order={4}>{currentMessage?.user.fullName}</Title>

          {isUser ? (
            <Group gap={2}>
              <ActionIcon
                color="violet.8"
                variant="transparent"
                size={"lg"}
                onClick={handleMessageDelete}
              >
                <RiChatDeleteLine size={"1.3rem"} />
              </ActionIcon>
              <ActionIcon
                color="violet.8"
                variant="transparent"
                size={"lg"}
                onClick={handleMessageEdit}
              >
                <FiEdit size={"1.2rem"} />
              </ActionIcon>
            </Group>
          ) : null}
        </Group>

        <Text>{currentMessage?.text}</Text>
        <Title c={"gray.5"} style={{ textAlign: "end" }} order={6}>
          {currentDate.toDateString()} - {currentDate.toLocaleTimeString()}
        </Title>
      </Stack>
    </Group>
  );

  async function handleMessageDelete() {
    await deleteMessage({
      variables: { input: { messageId: currentMessage?.id } },
    });
  }
  function handleOnMessageDeleted() {
    setChannels((prevChannels) => {
      const updatedChannels = [...prevChannels];
      updatedChannels[channelIndex].message.splice(messageIndex, 1);
      return updatedChannels;
    });
  }
  function handleMessageEdit() {
    if (currentMessage != undefined) {
      setMessageToEdit(currentMessage);
    }
  }
}

export default MessageBox;
