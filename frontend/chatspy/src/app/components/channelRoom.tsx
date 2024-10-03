import { useContext } from "react";
import { ChatContext } from "../contexts/chatContext";
import { DEFAULT_THEME, Stack, Box } from "@mantine/core";
import ChannelRoomHead from "./channelHead";
import MessageSender from "./messageSender";

type ChannelRoomProps = {
  channelId: string;
};

function ChannelRoom({ channelId }: ChannelRoomProps) {
  const { channels } = useContext(ChatContext);
  const currentChannel = channels.find((c) => c.id == channelId);
  return (
    <Stack
      h={"100%"}
      style={{
        position: "relative",
        borderRight: `2px solid ${DEFAULT_THEME.colors.dark[0]}`,
      }}
    >
      <ChannelRoomHead
        channelId={channelId}
        channelName={currentChannel ? currentChannel.name : ""}
      />
      <Box style={{ position: "absolute", bottom: "0", right: "0", left: "0" }}>
        <MessageSender />
      </Box>
    </Stack>
  );
}

export default ChannelRoom;
