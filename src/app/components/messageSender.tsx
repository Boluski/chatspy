import { Group, Button, Textarea, DEFAULT_THEME } from "@mantine/core";
import { useState, useContext } from "react";
import { IoIosSend } from "react-icons/io";
import { gql } from "@/__generated__/gql";
import { useMutation } from "@apollo/client";
import { ChatContext, messageType } from "../contexts/chatContext";
import { MdEdit } from "react-icons/md";

const CREATE_MESSAGE = gql(`
mutation Mutation($input: CreateMessageInput!) {
    createMessage(input: $input) {
      message {
        id
        text
        date
        user {
          username
          fullName
        }
      }
    }
  }`);

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
  channelIndex: number;
};
function MessageSender({ channelIndex }: MessageSenderProps) {
  const [messageText, setMessageText] = useState("");
  const [enableSendButton, setEnableSendButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const { username, channels, messageToEdit, setMessageToEdit } =
    useContext(ChatContext);
  const currentChannel = channels[channelIndex];
  const [createMessage] = useMutation(CREATE_MESSAGE);
  const [editMessage] = useMutation(EDIT_MESSAGE);
  return (
    <Group
      bg={"white"}
      p={10}
      mx={20}
      my={10}
      h={"6rem"}
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
        value={messageToEdit ? messageToEdit.text : messageText}
        onChange={(event) => {
          if (messageToEdit) {
            setMessageToEdit((prevMessage) => {
              const updatedMessage: messageType = {
                id: prevMessage ? prevMessage.id : "",
                text: prevMessage ? prevMessage.text : "",
                date: prevMessage ? prevMessage.date : "",
                user: {
                  username: prevMessage ? prevMessage.user.username : "",
                  fullName: prevMessage ? prevMessage.user.fullName : "",
                },
                threads: prevMessage ? prevMessage.threads : [],
              };
              updatedMessage.text = event.currentTarget.value;
              return updatedMessage;
            });
          } else {
            setMessageText(event.currentTarget.value);
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
          messageToEdit ? (
            <MdEdit size={"2rem"} />
          ) : (
            <IoIosSend size={"2.5rem"} />
          )
        }
        size="lg"
        radius={"md"}
        onClick={handleSendMessage}
      >
        {messageToEdit ? "Edit" : "Send"}
      </Button>
    </Group>
  );

  async function handleSendMessage() {
    setLoading(true);
    if (messageToEdit) {
      await editMessage({
        variables: {
          input: { text: messageToEdit.text, messageId: messageToEdit.id },
        },
      });
      setMessageToEdit(null);
    } else {
      await createMessage({
        variables: {
          input: {
            username: username,
            text: messageText,
            channelId: currentChannel.id,
          },
        },
      });
    }

    setMessageText("");
    setLoading(false);
    setEnableSendButton(false);
  }
}

export default MessageSender;
