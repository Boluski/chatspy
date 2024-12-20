import {
  Avatar,
  DEFAULT_THEME,
  Group,
  Stack,
  Title,
  Text,
  Box,
  Divider,
  ScrollArea,
} from "@mantine/core";
import { Dispatch, SetStateAction, useContext, useEffect, useRef } from "react";
import { ChatContext, messageType } from "../contexts/chatContext";
import ThreadBox from "./threadBox";
import ThreadSender from "./threadSender";
import { gql } from "@/__generated__/gql";
import { SubscriptionResult, useSubscription } from "@apollo/client";
import {
  OnMessageUpdatedTvSubscription,
  OnThreadDeletedSubscription,
  OnThreadSentSubscription,
  OnThreadUpdatedSubscription,
} from "@/__generated__/graphql";

const ON_THREAD_SENT_SUBSCRIPTION = gql(`
subscription OnThreadSent($messageId: String!) {
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
subscription OnThreadDeleted($messageId: String!) {
  onThreadDeleted(messageId: $messageId) {
    id
  }
}
        `);
const ON_THREAD_EDITED_SUBSCRIPTION = gql(`
subscription OnThreadUpdated($messageId: String!) {
  onThreadUpdated(messageId: $messageId) {
    id
    text
    date
  }
}
  `);

const ON_MESSAGE_EDITED_SUBSCRIPTION = gql(`
  subscription OnMessageUpdatedTV($messageId: String!) {
    onMessageUpdated(messageId: $messageId) {
      id
      text
    }
  }
      `);
const ON_MESSAGE_DELETED_SUBSCRIPTION = gql(`
        subscription OnMessageDeletedTV($messageId: String!) {
          onMessageDeleted(messageId: $messageId) {
            id
          }
        }
            `);

type ThreadViewerProps = {
  channelIndex: number;
  targetMessageId: string;
  setShowThread: Dispatch<SetStateAction<boolean>>;
};
const screenSize = "100vh";
const workspaceHeaderSize = "4.4rem";
const channelHeadSize = "3.8rem";
const threadBackButtonSize = "2.2rem";
function ThreadViewer({
  channelIndex,
  targetMessageId,
  setShowThread,
}: ThreadViewerProps) {
  const { username, setChannels, channels } = useContext(ChatContext);
  const messageIndex = useRef(-1);
  const messageThread = channels[channelIndex].message.find(
    (m) => m.id == targetMessageId
  );
  messageIndex.current = channels[channelIndex].message.findIndex(
    (m) => m.id == targetMessageId
  );

  useEffect(() => scrollToBottom(), [channels]);

  const viewport = useRef<HTMLDivElement>(null);

  const isUser = messageThread?.user.username == username;

  useSubscription(ON_THREAD_SENT_SUBSCRIPTION, {
    variables: { messageId: messageThread ? messageThread.id : "" },
    fetchPolicy: "network-only",
    onData(data) {
      handleOnTheadSent(data.data);
    },
  });
  useSubscription(ON_THREAD_DELETED_SUBSCRIPTION, {
    fetchPolicy: "network-only",
    variables: { messageId: messageThread ? messageThread.id : "" },
    onData(data) {
      handleOnThreadDeleted(data.data);
    },
  });

  useSubscription(ON_THREAD_EDITED_SUBSCRIPTION, {
    fetchPolicy: "network-only",
    variables: { messageId: messageThread ? messageThread.id : "" },
    onData(data) {
      handleOnThreadEdited(data.data);
    },
  });

  useSubscription(ON_MESSAGE_EDITED_SUBSCRIPTION, {
    fetchPolicy: "network-only",
    variables: { messageId: messageThread ? messageThread.id : "" },
    onData(data) {
      handleOnMessageEdited(data.data);
    },
  });

  useSubscription(ON_MESSAGE_DELETED_SUBSCRIPTION, {
    fetchPolicy: "network-only",
    variables: { messageId: messageThread ? messageThread.id : "" },
    onData() {
      handleOnMessageDeleted();
    },
  });

  return (
    <Stack
      gap={2}
      h={`calc(${screenSize} - ${workspaceHeaderSize} - ${channelHeadSize} - ${threadBackButtonSize})`}
      pos={"relative"}
    >
      {messageThread && (
        <Box
          pos={"absolute"}
          left={0}
          right={0}
          top={0}
          bg={"gray.0"}
          style={{ zIndex: 100 }}
          h={"7rem"}
        >
          <TargetMessage isUser={isUser} message={messageThread} />
          <Divider
            styles={{
              label: {
                fontSize: "1rem",
                color: DEFAULT_THEME.colors.violet[8],
              },
            }}
            label={"Comments"}
            labelPosition="center"
            color="violet.8"
          />
        </Box>
      )}

      <ScrollArea type={"never"} viewportRef={viewport}>
        <Box h={"7.2rem"}></Box>
        {messageThread &&
          messageThread.threads.map((th) => {
            return (
              <Group pl={"2rem"} key={th.id} wrap={"nowrap"}>
                <Divider color="violet.8" size={"sm"} orientation="vertical" />
                <Box style={{ flexGrow: 1 }} pb={2}>
                  <ThreadBox thread={th} />
                </Box>
              </Group>
            );
          })}
        <Box h={"6rem"} my={6}></Box>
      </ScrollArea>

      <Box pos={"absolute"} bottom={0} right={0} left={0}>
        <ThreadSender messageId={messageThread ? messageThread.id : ""} />
      </Box>
    </Stack>
  );
  function scrollToBottom() {
    if (viewport.current != null) {
      viewport.current!.scrollTo({
        top: viewport.current!.scrollHeight,
        behavior: "instant",
      });
    }
  }

  function handleOnTheadSent(
    data: SubscriptionResult<OnThreadSentSubscription, any>
  ) {
    if (data) {
      setChannels((prevChannels) => {
        const updatedChannel = [...prevChannels];
        updatedChannel[channelIndex].message[messageIndex.current].threads.push(
          {
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
          }
        );

        return updatedChannel;
      });
      console.log("Success");
    }
  }

  function handleOnThreadDeleted(
    data: SubscriptionResult<OnThreadDeletedSubscription, any>
  ) {
    if (data.data) {
      setChannels((prevChannels) => {
        const updatedChannels = [...prevChannels];
        const threadIndex = updatedChannels[channelIndex].message[
          messageIndex.current
        ].threads.findIndex((th) => th.id == data.data?.onThreadDeleted.id);

        updatedChannels[channelIndex].message[
          messageIndex.current
        ].threads.splice(threadIndex, 1);
        return updatedChannels;
      });
    }
  }

  function handleOnThreadEdited(
    data: SubscriptionResult<OnThreadUpdatedSubscription, any>
  ) {
    if (data.data) {
      setChannels((prevChannels) => {
        const updatedChannels = [...prevChannels];
        const threadIndex = updatedChannels[channelIndex].message[
          messageIndex.current
        ].threads.findIndex((th) => th.id == data.data?.onThreadUpdated.id);

        updatedChannels[channelIndex].message[messageIndex.current].threads[
          threadIndex
        ].text = data.data ? data.data.onThreadUpdated.text : "";
        return updatedChannels;
      });
    }
  }

  function handleOnMessageEdited(
    data: SubscriptionResult<OnMessageUpdatedTvSubscription, any>
  ) {
    if (data.data) {
      const updatedText = data.data.onMessageUpdated.text;
      setChannels((prevChannels) => {
        const updatedChannels = [...prevChannels];
        updatedChannels[channelIndex].message[messageIndex.current].text =
          updatedText;
        return updatedChannels;
      });
    }
  }

  function handleOnMessageDeleted() {
    setChannels((prevChannels) => {
      const updatedChannels = [...prevChannels];
      updatedChannels[channelIndex].message.splice(messageIndex.current, 1);
      return updatedChannels;
    });
    setShowThread(false);
  }
}

type ThreadMessageProps = {
  message: messageType;
  isUser: boolean;
};
function TargetMessage({ message, isUser }: ThreadMessageProps) {
  const currentDate = new Date(message ? message.date : "");
  return (
    <Group wrap={"nowrap"} align={"start"} bg={isUser ? "violet.0" : ""} p={5}>
      <Avatar
        size={"lg"}
        name={message.user.fullName}
        styles={
          isUser
            ? {
                root: {
                  border: `2px solid ${DEFAULT_THEME.colors.violet[8]}`,
                },
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
          <Title order={4}>{message.user.fullName}</Title>
        </Group>
        <Text lineClamp={1}>{message.text}</Text>
        <Title c={"gray.5"} style={{ textAlign: "end" }} order={6}>
          {currentDate.toDateString()} - {currentDate.toLocaleTimeString()}
        </Title>
      </Stack>
    </Group>
  );
}

export default ThreadViewer;
