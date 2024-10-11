import {
  Avatar,
  Button,
  DEFAULT_THEME,
  Group,
  Stack,
  Title,
  Text,
  Box,
  Divider,
  ScrollArea,
} from "@mantine/core";
import { useContext, useRef } from "react";
import { ChatContext, messageType } from "../contexts/chatContext";
import ThreadBox from "./threadBox";
import ThreadSender from "./threadSender";
import { gql } from "@/__generated__/gql";
import { SubscriptionResult, useSubscription } from "@apollo/client";
import { OnThreadSentSubscription } from "@/__generated__/graphql";

const ON_THREAD_SENT = gql(`
  subscription OnThreadSent($messageId: UUID!) {
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

type ThreadViewerProps = {
  channelIndex: number;
  targetMessageId: string;
};
function ThreadViewer({ channelIndex, targetMessageId }: ThreadViewerProps) {
  const { username, setChannels, channels } = useContext(ChatContext);
  const messageIndex = useRef(-1);
  const messageThread = channels[channelIndex].message.find(
    (m) => m.id == targetMessageId
  );

  messageIndex.current = channels[channelIndex].message.findIndex(
    (m) => m.id == targetMessageId
  );

  console.log("MessageIndex", messageIndex);

  const isUser = messageThread?.user.username == username;
  console.log("logging");

  useSubscription(ON_THREAD_SENT, {
    variables: { messageId: messageThread ? messageThread.id : "" },
    fetchPolicy: "network-only",
    onData: (data) => {
      handleOnTheadSent(data.data);
    },
  });

  return (
    <Stack gap={2}>
      {messageThread && (
        <Box
          style={{
            borderBottom: `2px solid ${DEFAULT_THEME.colors.violet[8]}`,
          }}
        >
          <TargetMessage isUser={isUser} message={messageThread} />
        </Box>
      )}
      <Stack
        h={"1000rem"}
        mah={"66vh"}
        gap={0}
        style={{
          //  border: "solid red 2px",
          position: "relative",
        }}
      >
        <ScrollArea type={"never"}>
          {messageThread &&
            messageThread.threads.map((th) => {
              return (
                <Group pl={"2rem"} key={th.id}>
                  <Divider
                    color="violet.8"
                    size={"sm"}
                    orientation="vertical"
                  />
                  <Box style={{ flexGrow: 1 }} pb={2}>
                    <ThreadBox thread={th} />
                  </Box>
                </Group>
              );
            })}
          <Box style={{}} h={"6rem"}></Box>
        </ScrollArea>

        <Box style={{ position: "absolute", bottom: 0, right: 0, left: 0 }}>
          <ThreadSender messageId={messageThread ? messageThread.id : ""} />
        </Box>
      </Stack>
    </Stack>
  );

  function handleOnTheadSent(
    data: SubscriptionResult<OnThreadSentSubscription, any>
  ) {
    if (data) {
      console.log("DATA", data);

      setChannels((prevChannels) => {
        const updatedChannel = [...prevChannels];
        console.log(
          "Message::",
          updatedChannel[channelIndex].message[messageIndex.current]
        );

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
        <Text>{message.text}</Text>
        <Title c={"gray.5"} style={{ textAlign: "end" }} order={6}>
          {currentDate.toDateString()} - {currentDate.toLocaleTimeString()}
        </Title>
      </Stack>
    </Group>
  );
}

export default ThreadViewer;
