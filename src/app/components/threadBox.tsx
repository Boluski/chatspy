import {
  Stack,
  Group,
  Avatar,
  Title,
  Text,
  DEFAULT_THEME,
  ActionIcon,
} from "@mantine/core";
import { useContext } from "react";
import { ChatContext, threadType } from "../contexts/chatContext";
import { FiEdit } from "react-icons/fi";
import { RiChatDeleteLine } from "react-icons/ri";
import { useMutation } from "@apollo/client";
import { gql } from "@/__generated__/gql";

const DELETE_THREAD = gql(`
mutation DeleteThread($input: DeleteThreadInput!) {
  deleteThread(input: $input) {
    thread {
      id
    }
  }
}
      `);

type ThreadBoxProps = {
  thread: threadType;
};

function ThreadBox({ thread }: ThreadBoxProps) {
  const { username, setThreadToEdit } = useContext(ChatContext);

  const isUser = thread.user.username == username;

  const dateString: string = thread.date;

  const currentDate = new Date(dateString);

  const [deleteThread] = useMutation(DELETE_THREAD);

  return (
    <Group wrap={"nowrap"} align={"start"} bg={isUser ? "violet.0" : ""} p={5}>
      <Avatar
        size={"lg"}
        name={thread.user.fullName}
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
      <Stack gap={2} w={"100%"}>
        <Group justify={"space-between"}>
          <Title order={4}>{thread.user.fullName}</Title>

          {isUser ? (
            <Group gap={2}>
              <ActionIcon
                color="violet.8"
                variant="transparent"
                size={"lg"}
                onClick={handleThreadEdit}
              >
                <FiEdit size={"1.2rem"} />
              </ActionIcon>
              <ActionIcon
                color="violet.8"
                variant="transparent"
                size={"lg"}
                onClick={handleThreadDelete}
              >
                <RiChatDeleteLine size={"1.3rem"} />
              </ActionIcon>
            </Group>
          ) : null}
        </Group>
        <Text>{thread.text}</Text>

        <Title c={"gray.5"} style={{ textAlign: "end" }} order={6}>
          {currentDate.toDateString()} - {currentDate.toLocaleTimeString()}
        </Title>
      </Stack>
    </Group>
  );

  async function handleThreadDelete() {
    await deleteThread({
      variables: { input: { threadId: thread.id } },
    });
  }

  function handleThreadEdit() {
    setThreadToEdit(thread);
  }
}

export default ThreadBox;
