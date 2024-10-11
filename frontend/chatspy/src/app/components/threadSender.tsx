import { Group, Button, Textarea, DEFAULT_THEME } from "@mantine/core";
import { useState, useContext } from "react";
import { IoIosSend } from "react-icons/io";
import { gql } from "@/__generated__/gql";
import { useMutation } from "@apollo/client";
import { ChatContext, messageType } from "../contexts/chatContext";
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

const EDIT_MESSAGE = gql(`
  mutation EditMessage($input: EditMessageInput!) {
  editMessage(input: $input) {
    message {
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

  const { username, channels, setChannels, messageToEdit, setMessageToEdit } =
    useContext(ChatContext);
  //   const currentChannel = channels[channelIndex];
  const [createThread] = useMutation(CREATE_THREAD);
  //   const [editMessage] = useMutation(EDIT_MESSAGE);
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
        value={messageToEdit ? messageToEdit.text : threadText}
        onChange={(event) => {
          //   if (messageToEdit) {
          // setMessageToEdit((prevMessage) => {
          //   const updatedMessage: messageType = {
          //     id: prevMessage ? prevMessage.id : "",
          //     text: prevMessage ? prevMessage.text : "",
          //     date: prevMessage ? prevMessage.date : "",
          //     user: {
          //       username: prevMessage ? prevMessage.user.username : "",
          //       fullName: prevMessage ? prevMessage.user.fullName : "",
          //     },
          //   };
          //   updatedMessage.text = event.currentTarget.value;
          //   return updatedMessage;
          // });
          //   } else {
          setThreadText(event.currentTarget.value);
          //   }

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
          messageToEdit ? (
            <MdEdit size={"2rem"} />
          ) : (
            <IoIosSend size={"2.5rem"} />
          )
        }
        size="lg"
        radius={"md"}
        onClick={handleSendThread}
      >
        {messageToEdit ? "Edit" : "Send"}
      </Button>
    </Group>
  );

  async function handleSendThread() {
    console.log(threadText);

    setLoading(true);
    // if (messageToEdit) {
    //   await editMessage({
    //     variables: {
    //       input: { text: messageToEdit.text, messageId: messageToEdit.id },
    //     },
    //   });
    //   setMessageToEdit(null);
    // } else {
    await createThread({
      variables: {
        input: {
          username: username,
          text: threadText,
          messageID: messageId,
        },
      },
    });
    // }
    setThreadText("");
    setLoading(false);
    setEnableSendButton(false);
  }
}

export default ThreadSender;
