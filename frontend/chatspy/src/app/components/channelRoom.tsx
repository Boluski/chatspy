import { useContext } from "react";
import { ChatContext } from "../contexts/chatContext";
import { DEFAULT_THEME, Stack, Box, ScrollArea } from "@mantine/core";
import ChannelRoomHead from "./channelHead";
import MessageSender from "./messageSender";
import MessageBox from "./messageBox";

type ChannelRoomProps = {
  channelId: string;
};

function ChannelRoom({ channelId }: ChannelRoomProps) {
  const { channels } = useContext(ChatContext);
  const currentChannel = channels.find((c) => c.id == channelId);
  const currentChannelIndex = channels.findIndex((c) => c.id == channelId);
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
        <ScrollArea type="never">
          <Stack gap={1} mx={20}>
            {currentChannel?.message.map((m) => {
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

      <MessageSender />
    </Stack>
  );
}

export default ChannelRoom;
