import { Group, Button, Textarea, DEFAULT_THEME } from "@mantine/core";
import { useState, useContext } from "react";
import { IoIosSend } from "react-icons/io";
import { gql } from "@/__generated__/gql";
import { useMutation } from "@apollo/client";
import { channelType, ChatContext, messageType } from "../contexts/chatContext";

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

type MessageSenderProps = {
  channelIndex: number;
};
function MessageSender({ channelIndex }: MessageSenderProps) {
  const [messageText, setMessageText] = useState("");
  const [enableSendButton, setEnableSendButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const { username, channels, setChannels } = useContext(ChatContext);
  const currentChannel = channels[channelIndex];
  const [createMessage] = useMutation(CREATE_MESSAGE);
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
        value={messageText}
        onChange={(event) => {
          setMessageText(event.currentTarget.value);
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
        rightSection={<IoIosSend size={"2.5rem"} />}
        size="lg"
        radius={"md"}
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </Group>
  );

  async function handleSendMessage() {
    setLoading(true);
    console.log(messageText);
    await createMessage({
      variables: {
        input: {
          username: username,
          text: messageText,
          channelId: currentChannel.id,
        },
      },
    });

    setMessageText("");
    setLoading(false);
  }
}

export default MessageSender;
