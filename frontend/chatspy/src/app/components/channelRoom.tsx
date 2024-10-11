import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext, messageType } from "../contexts/chatContext";
import {
  DEFAULT_THEME,
  Stack,
  Box,
  ScrollArea,
  Portal,
  Grid,
  Group,
  Title,
  ActionIcon,
} from "@mantine/core";
import ChannelRoomHead from "./channelHead";
import MessageSender from "./messageSender";
import MessageBox from "./messageBox";
import { gql } from "@/__generated__/gql";
import { IoChevronBackSharp } from "react-icons/io5";
import { SubscriptionResult, useSubscription } from "@apollo/client";
import { OnMessageSentSubscription } from "@/__generated__/graphql";
import ThreadViewer from "./threadViewer";

const SEND_MESSAGE_SUBSCRIPTION = gql(`
    subscription OnMessageSent($channelId: UUID!) {
  onMessageSent(channelId: $channelId) {
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

type ChannelRoomProps = {
  channelId: string;
};

function ChannelRoom({ channelId }: ChannelRoomProps) {
  const { channels, setChannels } = useContext(ChatContext);
  const [showThread, setShowThread] = useState(false);
  const [targetMessageId, setTargetMessageId] = useState("");
  const currentChannel = channels.find((c) => c.id == channelId);
  const currentChannelIndex = channels.findIndex((c) => c.id == channelId);

  useEffect(() => scrollToBottom(), [channels, showThread]);

  const viewport = useRef<HTMLDivElement>(null);

  function scrollToBottom() {
    if (viewport.current != null) {
      viewport.current!.scrollTo({
        top: viewport.current!.scrollHeight,
        behavior: "instant",
      });
    }
  }

  useSubscription(SEND_MESSAGE_SUBSCRIPTION, {
    variables: { channelId: currentChannel?.id },
    fetchPolicy: "network-only",
    onData: (data) => {
      handleReceivedMessage(data.data);
    },
  });
  return (
    <Stack
      mah={"100%"}
      h={"100%"}
      gap={0}
      justify={"space-between"}
      style={{
        borderRight: `2px solid ${DEFAULT_THEME.colors.dark[0]}`,
      }}
    >
      <ChannelRoomHead
        channelId={channelId}
        channelName={currentChannel ? currentChannel.name : ""}
      />

      {showThread ? (
        <Stack
          //   display={showThread ? "flex" : "none"}
          gap={0}
          h={"100%"}
          mx={20}
        >
          <Group align="center" gap={0}>
            <ActionIcon
              color="black"
              variant="transparent"
              size={"lg"}
              onClick={() => {
                setShowThread(false);
              }}
            >
              <IoChevronBackSharp size={"1.5rem"} />
            </ActionIcon>
            <Title order={2}>Threads</Title>
          </Group>
          {/* Threads  */}
          <ThreadViewer
            channelIndex={currentChannelIndex}
            targetMessageId={targetMessageId}
          />
        </Stack>
      ) : (
        <Stack
          // display={showThread ? "none" : "flex"}
          gap={0}
          h={"100%"}
          style={{ flexGrow: 1, position: "relative" }}
        >
          <Stack
            h={"100%"}
            mah={"78vh"}
            justify={"flex-end"}
            style={{ flexGrow: 1 }}
          >
            <ScrollArea type="never" viewportRef={viewport}>
              <Stack gap={1} mx={20}>
                {currentChannel?.message &&
                  currentChannel.message.map((m, index) => {
                    return (
                      <MessageBox
                        key={m.id}
                        channelIndex={currentChannelIndex}
                        messageId={m.id}
                        messageIndex={index}
                        setTargetMessageId={setTargetMessageId}
                        setShowThread={setShowThread}
                        showThread={showThread}
                      />
                    );
                  })}
                <Box style={{}} h={"4rem"}></Box>
              </Stack>
            </ScrollArea>
          </Stack>
          <Box style={{ position: "absolute", bottom: 0, right: 0, left: 0 }}>
            <MessageSender channelIndex={currentChannelIndex} />
          </Box>
        </Stack>
      )}
    </Stack>
  );

  function handleReceivedMessage(
    data: SubscriptionResult<OnMessageSentSubscription, any>
  ) {
    const receivedMessage = data.data;
    if (receivedMessage) {
      const latestMessage: messageType = {
        id: receivedMessage.onMessageSent.id,
        text: receivedMessage.onMessageSent.text,
        date: receivedMessage.onMessageSent.date,
        user: {
          fullName: receivedMessage.onMessageSent.user.fullName,
          username: receivedMessage.onMessageSent.user.username,
        },
        threads: [],
      };

      setChannels((prevChannel) => {
        const newChannels = [...prevChannel];
        if (newChannels[currentChannelIndex].message == undefined) {
          newChannels[currentChannelIndex].message = [];
        }
        newChannels[currentChannelIndex].message.push(latestMessage);
        return newChannels;
      });
    }
  }
}

export default ChannelRoom;
