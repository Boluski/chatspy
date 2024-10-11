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
} from "@mantine/core";
import { useContext } from "react";
import { ChatContext, messageType } from "../contexts/chatContext";
import ThreadBox from "./threadBox";
import MessageSender from "./messageSender";

function ThreadViewer() {
  const { messageThread, username } = useContext(ChatContext);
  const isUser = messageThread?.user.username == username;

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
        {messageThread &&
          messageThread.threads?.map((th) => {
            return (
              <Group pl={"2rem"}>
                <Divider color="violet.8" size={"sm"} orientation="vertical" />
                <Box style={{ flexGrow: 1 }} pb={2}>
                  <ThreadBox thread={th} />
                </Box>
              </Group>
            );
          })}
        {/* <Box style={{}} h={"4rem"}></Box> */}
        <Box style={{ position: "absolute", bottom: 0, right: 0, left: 0 }}>
          <MessageSender channelIndex={1} />
        </Box>
      </Stack>
    </Stack>
  );
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
