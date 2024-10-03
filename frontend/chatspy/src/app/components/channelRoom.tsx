import { useContext } from "react";
import { ChatContext } from "../contexts/chatContext";
import { Stack } from "@mantine/core";
import ChannelRoomHead from "./channelHead";

type ChannelRoomProps = {
  channelId: string;
};

function ChannelRoom({ channelId }: ChannelRoomProps) {
  const { channels } = useContext(ChatContext);
  const currentChannel = channels.find((c) => c.id == channelId);
  return (
    <Stack>
      <ChannelRoomHead
        channelId={channelId}
        channelName={currentChannel ? currentChannel.name : ""}
      />
    </Stack>
  );
}

export default ChannelRoom;
