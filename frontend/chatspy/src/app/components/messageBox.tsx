import {
  Stack,
  Group,
  Avatar,
  Title,
  Text,
  Box,
  DEFAULT_THEME,
} from "@mantine/core";
import { useContext } from "react";
import { ChatContext } from "../contexts/chatContext";

type MessageBoxProps = {
  channelIndex: number;
  messageId: string;
};

function MessageBox({ messageId, channelIndex }: MessageBoxProps) {
  const { channels, username } = useContext(ChatContext);
  const currentMessage = channels[channelIndex].message.find(
    (m) => m.id == messageId
  );
  const isUser = currentMessage?.user.username == username;

  const dateString: string = currentMessage ? currentMessage.date : "";

  const currentDate = new Date(dateString);
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
      <Stack gap={5} w={"100%"}>
        <Title order={4}>{currentMessage?.user.fullName}</Title>
        <Text>{currentMessage?.text}</Text>
        <Title c={"gray.5"} style={{ textAlign: "end" }} order={6}>
          {currentDate.toDateString()} - {currentDate.toLocaleTimeString()}
        </Title>
      </Stack>
    </Group>
  );
}

export default MessageBox;
