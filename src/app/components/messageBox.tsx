import {
  Stack,
  Group,
  Avatar,
  Title,
  Text,
  DEFAULT_THEME,
  ActionIcon,
  Button,
} from "@mantine/core";
import { Dispatch, SetStateAction, useContext } from "react";
import { ChatContext } from "../contexts/chatContext";
import { FiEdit } from "react-icons/fi";
import { RiChatDeleteLine } from "react-icons/ri";
import {
  SubscriptionResult,
  useMutation,
  useSubscription,
} from "@apollo/client";
import { gql } from "@/__generated__/gql";
import {
  OnMessageUpdatedSubscription,
  OnThreadDeletedMessageBoxSubscription,
  OnThreadSentMessageBoxSubscription,
  OnThreadUpdatedSubscription,
} from "@/__generated__/graphql";
import { BsReplyAll } from "react-icons/bs";

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
subscription OnMessageDeleted($messageId: String!) {
  onMessageDeleted(messageId: $messageId) {
    id
  }
}
    `);
const ON_MESSAGE_EDITED_SUBSCRIPTION = gql(`
subscription OnMessageUpdated($messageId: String!) {
  onMessageUpdated(messageId: $messageId) {
    id
    text
  }
}
    `);
const ON_THREAD_SENT_SUBSCRIPTION = gql(`
subscription OnThreadSentMessageBox($messageId: String!) {
  onThreadSent(messageId: $messageId) {
    id
    text
    date
    user {
      username
      fullName
    }
  }
}
  `);
const ON_THREAD_DELETED_SUBSCRIPTION = gql(`
  subscription OnThreadDeletedMessageBox($messageId: String!) {
    onThreadDeleted(messageId: $messageId) {
      id
      text
      date
    }
  }
        `);
const ON_THREAD_EDITED_SUBSCRIPTION = gql(`
  subscription OnThreadUpdatedMessageBox($messageId: String!) {
  onThreadUpdated(messageId: $messageId) {
    id
    text
    date
  }
}
  `);

type MessageBoxProps = {
  channelIndex: number;
  messageId: string;
  messageIndex: number;
  setTargetMessageId: Dispatch<SetStateAction<string>>;
  setShowThread: Dispatch<SetStateAction<boolean>>;
  showThread: boolean;
};
function MessageBox({
  messageId,
  channelIndex,
  messageIndex,
  setTargetMessageId,
  setShowThread,
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
    variables: { messageId: currentMessage ? currentMessage.id : "" },
    onData() {
      handleOnMessageDeleted();
    },
  });
  useSubscription(ON_MESSAGE_EDITED_SUBSCRIPTION, {
    fetchPolicy: "network-only",
    variables: { messageId: currentMessage ? currentMessage.id : "" },
    onData(data) {
      handleOnMessageEdited(data.data);
    },
  });

  useSubscription(ON_THREAD_SENT_SUBSCRIPTION, {
    fetchPolicy: "network-only",
    variables: { messageId: currentMessage ? currentMessage.id : "" },
    onData: (data) => {
      handleOnTheadSent(data.data);
    },
  });

  useSubscription(ON_THREAD_DELETED_SUBSCRIPTION, {
    fetchPolicy: "network-only",
    variables: { messageId: currentMessage ? currentMessage.id : "" },
    onData(data) {
      handleOnThreadDeleted(data.data);
    },
  });

  useSubscription(ON_THREAD_EDITED_SUBSCRIPTION, {
    fetchPolicy: "network-only",
    variables: { messageId: currentMessage ? currentMessage.id : "" },
    onData(data) {
      handleOnThreadEdited(data.data);
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
                onClick={() => {
                  if (currentMessage) {
                    setTargetMessageId(currentMessage.id);
                    setShowThread(true);
                  }
                }}
              >
                <BsReplyAll size={"1.3rem"} />
              </ActionIcon>
              <ActionIcon
                color="violet.8"
                variant="transparent"
                size={"lg"}
                onClick={handleMessageEdit}
              >
                <FiEdit size={"1.2rem"} />
              </ActionIcon>
              <ActionIcon
                color="violet.8"
                variant="transparent"
                size={"lg"}
                onClick={handleMessageDelete}
              >
                <RiChatDeleteLine size={"1.3rem"} />
              </ActionIcon>
            </Group>
          ) : (
            <Group gap={2}>
              <ActionIcon
                color="gray.8"
                variant="transparent"
                size={"lg"}
                onClick={() => {
                  if (currentMessage) {
                    setTargetMessageId(currentMessage.id);
                    setShowThread(true);
                  }
                }}
              >
                <BsReplyAll size={"1.3rem"} />
              </ActionIcon>
            </Group>
          )}
        </Group>
        <Text>{currentMessage?.text}</Text>
        {currentMessage?.threads?.length != 0 ? (
          <Group>
            <Button
              color="violet.8"
              variant="transparent"
              onClick={() => {
                if (currentMessage) {
                  setTargetMessageId(currentMessage.id);
                  setShowThread(true);
                }
              }}
            >
              {currentMessage?.threads != undefined ? (
                <>
                  {currentMessage?.threads?.length > 1
                    ? `${currentMessage?.threads?.length} Replies`
                    : `${currentMessage?.threads?.length} Reply`}
                </>
              ) : null}
            </Button>
          </Group>
        ) : null}

        <Title c={"gray.5"} style={{ textAlign: "end" }} order={6}>
          {currentDate.toDateString()} - {currentDate.toLocaleTimeString()}
        </Title>
      </Stack>
    </Group>
  );

  function handleOnThreadEdited(
    data: SubscriptionResult<OnThreadUpdatedSubscription, any>
  ) {
    if (data.data) {
      setChannels((prevChannels) => {
        const updatedChannels = [...prevChannels];
        const threadIndex = updatedChannels[channelIndex].message[
          messageIndex
        ].threads.findIndex((th) => th.id == data.data?.onThreadUpdated.id);
        updatedChannels[channelIndex].message[messageIndex].threads[
          threadIndex
        ].text = data.data ? data.data.onThreadUpdated.text : "";
        return updatedChannels;
      });
    }
  }

  function handleOnThreadDeleted(
    data: SubscriptionResult<OnThreadDeletedMessageBoxSubscription, any>
  ) {
    if (data.data) {
      setChannels((prevChannels) => {
        const updatedChannels = [...prevChannels];
        const threadIndex = updatedChannels[channelIndex].message[
          messageIndex
        ].threads.findIndex((th) => th.id == data.data?.onThreadDeleted.id);

        updatedChannels[channelIndex].message[messageIndex].threads.splice(
          threadIndex,
          1
        );
        return updatedChannels;
      });
    }
  }

  function handleOnTheadSent(
    data: SubscriptionResult<OnThreadSentMessageBoxSubscription, any>
  ) {
    if (data) {
      setChannels((prevChannels) => {
        const updatedChannel = [...prevChannels];

        updatedChannel[channelIndex].message[messageIndex].threads.push({
          id: data.data?.onThreadSent ? data.data.onThreadSent.id : "",
          text: data.data?.onThreadSent ? data.data.onThreadSent.text : "",
          date: data.data?.onThreadSent ? data.data.onThreadSent.date : "",
          user: {
            username: data.data?.onThreadSent
              ? data.data.onThreadSent.user.username
              : "",
            fullName: data.data?.onThreadSent
              ? data.data.onThreadSent.user.fullName
              : "",
          },
        });

        return updatedChannel;
      });
    }
  }

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

  function handleOnMessageEdited(
    data: SubscriptionResult<OnMessageUpdatedSubscription, any>
  ) {
    if (data.data) {
      const updatedText = data.data.onMessageUpdated.text;
      setChannels((prevChannels) => {
        const updatedChannels = [...prevChannels];
        updatedChannels[channelIndex].message[messageIndex].text = updatedText;
        return updatedChannels;
      });
    }
  }

  function handleMessageEdit() {
    if (currentMessage != undefined) {
      setMessageToEdit(currentMessage);
    }
  }
}

export default MessageBox;
