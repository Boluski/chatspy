import { useContext, useEffect, useRef } from "react";
import { ChatContext, messageType } from "../contexts/chatContext";
import { DEFAULT_THEME, Stack, Box, ScrollArea } from "@mantine/core";
import ChannelRoomHead from "./channelHead";
import MessageSender from "./messageSender";
import MessageBox from "./messageBox";
import { gql } from "@/__generated__/gql";
import { SubscriptionResult, useSubscription } from "@apollo/client";
import { OnMessageSentSubscription } from "@/__generated__/graphql";

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
  const currentChannel = channels.find((c) => c.id == channelId);
  const currentChannelIndex = channels.findIndex((c) => c.id == channelId);

  useEffect(() => scrollToBottom(), [channels]);

  const viewport = useRef<HTMLDivElement>(null);
  const scrollToBottom = () =>
    viewport.current!.scrollTo({
      top: viewport.current!.scrollHeight,
      behavior: "instant",
    });

  useSubscription(SEND_MESSAGE_SUBSCRIPTION, {
    variables: { channelId: currentChannel?.id },
    fetchPolicy: "network-only",
    onData: (data) => {
      handleReceivedMessage(data.data);
    },
  });
  return (
    <Stack
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
      <Stack mah={"70vh"} h={"100%"} justify={"flex-end"}>
        <ScrollArea type="never" viewportRef={viewport}>
          <Stack gap={1} mx={20}>
            {currentChannel?.message &&
              currentChannel.message.map((m) => {
                return (
                  <MessageBox
                    channelIndex={currentChannelIndex}
                    messageId={m.id}
                  />
                );
              })}
          </Stack>
        </ScrollArea>
      </Stack>

      <MessageSender channelIndex={currentChannelIndex} />
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
