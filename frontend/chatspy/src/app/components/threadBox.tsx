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
import { OnMessageUpdatedSubscription } from "@/__generated__/graphql";

const DELETE_THREAD = gql(`
mutation DeleteThread($input: DeleteThreadInput!) {
  deleteThread(input: $input) {
    thread {
      id
    }
  }
}
      `);
const ON_THREAD_DELETED_SUBSCRIPTION = gql(`
subscription OnThreadDeleted($threadTopic: String!) {
  onThreadDeleted(threadTopic: $threadTopic) {
    id
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
  channelIndex: number;
  messageIndex: number;
  thread: threadType;
};

function ThreadBox({ thread, messageIndex, channelIndex }: ThreadBoxProps) {
  const { channels, setChannels, username, setMessageToEdit } =
    useContext(ChatContext);
  // const currentMessage = channels[channelIndex].message.find(
  //   (m) => m.id == messageId
  // );
  const isUser = thread.user.username == username;

  const dateString: string = thread.date;

  const currentDate = new Date(dateString);

  const [deleteThread] = useMutation(DELETE_THREAD);
  useSubscription(ON_THREAD_DELETED_SUBSCRIPTION, {
    fetchPolicy: "network-only",
    variables: { threadTopic: `[DELETE]${thread.id}` },
    onData() {
      handleOnThreadDeleted();
    },
  });

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
                // onClick={handleMessageEdit}
              >
                <FiEdit size={"1.2rem"} />
              </ActionIcon>
              <ActionIcon
                color="violet.8"
                variant="transparent"
                size={"lg"}
                onClick={handleThreadDelete}
              >
                <RiChatDeleteLine size={"1.3rem"} />
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

  async function handleThreadDelete() {
    await deleteThread({
      variables: { input: { threadId: thread.id } },
    });
  }
  function handleOnThreadDeleted() {
    setChannels((prevChannels) => {
      const updatedChannels = [...prevChannels];
      const threadIndex = updatedChannels[channelIndex].message[
        messageIndex
      ].threads.findIndex((th) => th.id == thread.id);
      updatedChannels[channelIndex].message[messageIndex].threads.splice(
        threadIndex,
        1
      );
      return updatedChannels;
    });
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
