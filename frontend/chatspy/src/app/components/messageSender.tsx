import { Group, Button, Textarea, DEFAULT_THEME } from "@mantine/core";
import { useState } from "react";
import { IoIosSend } from "react-icons/io";

function MessageSender() {
  const [messageText, setMessageText] = useState("");
  const [enableSendButton, setEnableSendButton] = useState(false);
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
          setMessageText(event.currentTarget.value.trim());
          if (event.currentTarget.value.trim() != "") {
            setEnableSendButton(true);
          } else {
            setEnableSendButton(false);
          }
        }}
      />
      <Button
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

  function handleSendMessage() {
    console.log(messageText);
  }
}

export default MessageSender;
