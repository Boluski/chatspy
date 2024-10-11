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
          <ThreadMessage isUser={isUser} message={messageThread} />
        </Box>
      )}
      <Stack gap={0}>
        <Group pl={"2rem"}>
          <Divider color="violet.8" size={"sm"} orientation="vertical" />
          <Box style={{ flexGrow: 1 }} pb={2}>
            <ThreadMessage
              isUser={isUser}
              message={messageThread ? messageThread : ({} as messageType)}
            />
          </Box>
        </Group>
        <Group pl={"2rem"}>
          <Divider color="violet.8" size={"sm"} orientation="vertical" />
          <Box style={{ flexGrow: 1 }} pb={2}>
            <ThreadMessage
              isUser={isUser}
              message={messageThread ? messageThread : ({} as messageType)}
            />
          </Box>
        </Group>
        <Group pl={"2rem"}>
          <Divider color="violet.8" size={"sm"} orientation="vertical" />
          <Box style={{ flexGrow: 1 }} pb={2}>
            <ThreadMessage
              isUser={isUser}
              message={messageThread ? messageThread : ({} as messageType)}
            />
          </Box>
        </Group>
        <Group pl={"2rem"}>
          <Divider color="violet.8" size={"sm"} orientation="vertical" />
          <Box style={{ flexGrow: 1 }} pb={2}>
            <ThreadMessage
              isUser={isUser}
              message={messageThread ? messageThread : ({} as messageType)}
            />
          </Box>
        </Group>
        <Group pl={"2rem"}>
          <Divider color="violet.8" size={"sm"} orientation="vertical" />
          <Box style={{ flexGrow: 1 }} pb={2}>
            <ThreadMessage
              isUser={isUser}
              message={messageThread ? messageThread : ({} as messageType)}
            />
          </Box>
        </Group>
        <Group pl={"2rem"}>
          <Divider color="violet.8" size={"sm"} orientation="vertical" />
          <Box style={{ flexGrow: 1 }} pb={2}>
            <ThreadMessage
              isUser={isUser}
              message={messageThread ? messageThread : ({} as messageType)}
            />
          </Box>
        </Group>
      </Stack>
    </Stack>
  );
}

type ThreadMessageProps = {
  message: messageType;
  isUser: boolean;
};

function ThreadMessage({ message, isUser }: ThreadMessageProps) {
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
