import { Group, Button, Textarea, DEFAULT_THEME } from "@mantine/core";
import { useState, useContext } from "react";
import { IoIosSend } from "react-icons/io";
import { gql } from "@/__generated__/gql";
import { useMutation } from "@apollo/client";
import { ChatContext, messageType, threadType } from "../contexts/chatContext";
import { MdEdit } from "react-icons/md";

const CREATE_THREAD = gql(`
mutation CreateThread($input: CreateThreadInput!) {
  createThread(input: $input) {
    thread {
      id
      text
      date
      user {
          username
          fullName
        }
    }
  }
}
  `);

const EDIT_THREAD = gql(`
mutation EditThread($input: EditThreadInput!) {
  editThread(input: $input) {
    thread {
      id
      text
      date
    }
  }
}
   `);

type MessageSenderProps = {
  messageId: string;
};
function ThreadSender({ messageId }: MessageSenderProps) {
  const [threadText, setThreadText] = useState("");
  const [enableSendButton, setEnableSendButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const { username, channels, setChannels, threadToEdit, setThreadToEdit } =
    useContext(ChatContext);
  //   const currentChannel = channels[channelIndex];
  const [createThread] = useMutation(CREATE_THREAD);
  const [editThread] = useMutation(EDIT_THREAD);
  return (
    <Group
      bg={"white"}
      p={10}
      mx={20}
      my={5}
      style={{
        borderRadius: "0.5rem",
        border: `solid ${DEFAULT_THEME.colors.dark[0]} 2px`,
      }}
    >
      <Textarea
        styles={{ input: { border: "transparent" } }}
        style={{ flexGrow: "1" }}
        size={"md"}
        radius={"md"}
        placeholder="Send your team the latest update."
        value={threadToEdit ? threadToEdit.text : threadText}
        onChange={(event) => {
          if (threadToEdit) {
            setThreadToEdit((prevThread) => {
              const updatedThread: threadType = {
                id: prevThread ? prevThread.id : "",
                text: prevThread ? prevThread.text : "",
                date: prevThread ? prevThread.date : "",
                user: {
                  username: prevThread ? prevThread.user.username : "",
                  fullName: prevThread ? prevThread.user.fullName : "",
                },
              };
              updatedThread.text = event.currentTarget.value;
              return updatedThread;
            });
          } else {
            setThreadText(event.currentTarget.value);
          }

          if (event.currentTarget.value.trim() != "") {
            setEnableSendButton(true);
          } else {
            setEnableSendButton(false);
          }
        }}
      />
      <Button
        loading={loading}
        disabled={!enableSendButton}
        color="violet.8"
        rightSection={
          threadToEdit ? (
            <MdEdit size={"2rem"} />
          ) : (
            <IoIosSend size={"2.5rem"} />
          )
        }
        size="lg"
        radius={"md"}
        onClick={handleSendThread}
      >
        {threadToEdit ? "Edit" : "Send"}
      </Button>
    </Group>
  );

  async function handleSendThread() {
    console.log(threadText);

    setLoading(true);
    if (threadToEdit) {
      await editThread({
        variables: {
          input: { text: threadToEdit.text, threadId: threadToEdit.id },
        },
      });
      console.log(threadToEdit.text);
      setThreadToEdit(null);
    } else {
      await createThread({
        variables: {
          input: {
            username: username,
            text: threadText,
            messageID: messageId,
          },
        },
      });
    }
    setThreadText("");
    setLoading(false);
    setEnableSendButton(false);
  }
}

export default ThreadSender;
