import {
  Stack,
  Group,
  Avatar,
  Title,
  Text,
  Box,
  DEFAULT_THEME,
  ActionIcon,
  Button,
} from "@mantine/core";
import { useContext } from "react";
import { ChatContext, threadType } from "../contexts/chatContext";
import { FiEdit } from "react-icons/fi";
import { RiChatDeleteLine } from "react-icons/ri";
import {
  SubscriptionResult,
  useMutation,
  useSubscription,
} from "@apollo/client";
import { gql } from "@/__generated__/gql";
import {
  OnMessageDeletedSubscription,
  OnMessageUpdatedSubscription,
} from "@/__generated__/graphql";

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
  subscription OnMessageDeleted($messageTopic: String!) {
    onMessageDeleted(messageTopic: $messageTopic) {
      id
      text
      date
    }
  }
      `);
const ON_MESSAGE_EDITED_SUBSCRIPTION = gql(`
      subscription OnMessageUpdated($messageTopic: String!) {
    onMessageUpdated(messageTopic: $messageTopic) {
      id
      text
    }
  }
      `);

type ThreadBoxProps = {
  // channelIndex: number;
  // messageId: string;
  // messageIndex: number;
  thread: threadType;
};

function ThreadBox({ thread }: ThreadBoxProps) {
  const {
    channels,
    setChannels,
    username,
    setMessageToEdit,
    setShowThread,
    setMessageThread,
  } = useContext(ChatContext);
  // const currentMessage = channels[channelIndex].message.find(
  //   (m) => m.id == messageId
  // );
  const isUser = thread.user.username == username;

  const dateString: string = thread.date;

  const currentDate = new Date(dateString);

  // const [deleteMessage] = useMutation(DELETE_MESSAGE);
  // useSubscription(ON_MESSAGE_DELETED_SUBSCRIPTION, {
  //   fetchPolicy: "network-only",
  //   variables: { messageTopic: `[DELETE]${currentMessage?.id}` },
  //   onData() {
  //     // handleOnMessageDeleted();
  //   },
  // });
  // useSubscription(ON_MESSAGE_EDITED_SUBSCRIPTION, {
  //   fetchPolicy: "network-only",
  //   variables: { messageTopic: `[EDIT]${currentMessage?.id}` },
  //   onData(data) {
  //     // handleOnMessageEdited(data.data);
  //   },
  // });

  return (
    <Group wrap={"nowrap"} align={"start"} bg={isUser ? "violet.0" : ""} p={5}>
      <Avatar
        size={"lg"}
        name={thread.user.fullName}
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
          <Title order={4}>{thread.user.fullName}</Title>

          {isUser ? (
            <Group gap={2}>
              <ActionIcon
                color="violet.8"
                variant="transparent"
                size={"lg"}
                // onClick={handleMessageDelete}
              >
                <RiChatDeleteLine size={"1.3rem"} />
              </ActionIcon>
              <ActionIcon
                color="violet.8"
                variant="transparent"
                size={"lg"}
                // onClick={handleMessageEdit}
              >
                <FiEdit size={"1.2rem"} />
              </ActionIcon>
            </Group>
          ) : null}
        </Group>
        <Text>{thread.text}</Text>

        <Title c={"gray.5"} style={{ textAlign: "end" }} order={6}>
          {currentDate.toDateString()} - {currentDate.toLocaleTimeString()}
        </Title>
      </Stack>
    </Group>
  );

  async function handleMessageDelete() {
    // await deleteMessage({
    //   variables: { input: { messageId: currentMessage?.id } },
    // });
  }
  function handleOnMessageDeleted() {
    // setChannels((prevChannels) => {
    //   const updatedChannels = [...prevChannels];
    //   updatedChannels[channelIndex].message.splice(messageIndex, 1);
    //   return updatedChannels;
    // });
  }
  function handleOnMessageEdited(
    data: SubscriptionResult<OnMessageUpdatedSubscription, any>
  ) {
    // if (data.data) {
    //   const updatedText = data.data.onMessageUpdated.text;
    //   setChannels((prevChannels) => {
    //     const updatedChannels = [...prevChannels];
    //     updatedChannels[channelIndex].message[messageIndex].text = updatedText;
    //     return updatedChannels;
    //   });
    // }
  }

  function handleMessageEdit() {
    // if (currentMessage != undefined) {
    //   setMessageToEdit(currentMessage);
    // }
  }
}

export default ThreadBox;
