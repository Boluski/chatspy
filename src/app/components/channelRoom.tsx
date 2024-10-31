import { useContext, useEffect, useRef, useState } from "react";
import { channelType, ChatContext, messageType } from "../contexts/chatContext";
import { Stack, Box, ScrollArea, Group, Button, Modal } from "@mantine/core";
import ChannelRoomHead from "./channelHead";
import MessageSender from "./messageSender";
import MessageBox from "./messageBox";
import { gql } from "@/__generated__/gql";
import { IoChevronBackSharp } from "react-icons/io5";
import { SubscriptionResult, useSubscription } from "@apollo/client";
import {
  ChannelType,
  OnMessageSentSubscription,
} from "@/__generated__/graphql";
import ThreadViewer from "./threadViewer";
import { UserContext } from "../contexts/userContext";
import { useDisclosure } from "@mantine/hooks";
import AddMemberToChannel from "./AddMemberToChannel";
import ChannelSettings from "./channelSettings";

const ON_SEND_MESSAGE_SUBSCRIPTION = gql(`
subscription OnMessageSent($channelId: String!) {
  onMessageSent(channelId: $channelId) {
    id
    text
    date
    user {
      username
      fullName
    }
  }
}
    `);

type ChannelRoomProps = {
  channelId: string;
  onTabClicked: number;
};
const screenSize = "100vh";
const workspaceHeaderSize = "4.4rem";
const channelHeadSize = "3.8rem";
function ChannelRoom({ channelId, onTabClicked }: ChannelRoomProps) {
  const { channels, setChannels, username } = useContext(ChatContext);
  const { currentWorkspace } = useContext(UserContext);
  const [showThread, setShowThread] = useState(false);
  const [targetMessageId, setTargetMessageId] = useState("");
  const currentChannel = channels.find((c) => c.id == channelId);
  const currentChannelIndex = channels.findIndex((c) => c.id == channelId);

  const [
    addUserOpened,
    { open: openAddUserFunction, close: closeAddUserFunction },
  ] = useDisclosure(false);
  const [
    channelSettingsOpened,
    { open: openChannelSettingsFunction, close: closeChannelSettingsFunction },
  ] = useDisclosure(false);

  const viewport = useRef<HTMLDivElement>(null);

  useSubscription(ON_SEND_MESSAGE_SUBSCRIPTION, {
    variables: { channelId: currentChannel ? currentChannel.id : "" },
    fetchPolicy: "network-only",
    onData: (data) => {
      handleReceivedMessage(data.data);
    },
  });
  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [channels, showThread, onTabClicked]);
  return (
    <>
      <Stack
        h={`calc(${screenSize} - ${workspaceHeaderSize})`}
        gap={0}
        pos={"relative"}
      >
        <Box pos={"absolute"} left={0} right={0} style={{ zIndex: 100 }}>
          <ChannelRoomHead
            channelName={currentChannel ? currentChannel.name : ""}
            showControls={
              currentWorkspace?.isAdmin
                ? currentChannel?.type != ChannelType.Direct
                  ? true
                  : false
                : false
            }
            isPrivate={
              currentChannel?.type == ChannelType.Private ? true : false
            }
            isDirect={currentChannel?.type == ChannelType.Direct ? true : false}
            dmUsers={
              currentChannel?.type == ChannelType.Direct
                ? currentChannel.users
                : undefined
            }
            openAddUserFunction={openAddUserFunction}
            openChannelSettingsFunction={openChannelSettingsFunction}
            username={username}
          />
        </Box>

        {showThread ? (
          <Stack
            gap={0}
            mx={20}
            h={`calc(${screenSize} - ${workspaceHeaderSize} - ${channelHeadSize})`}
            mt={"auto"}
          >
            <Group align="center" gap={0} h={"2.2rem"}>
              <Button
                color="black"
                variant="transparent"
                size={"sm"}
                onClick={() => {
                  setShowThread(false);
                }}
                leftSection={<IoChevronBackSharp size={"1rem"} />}
              >
                Back
              </Button>
            </Group>
            <ThreadViewer
              channelIndex={currentChannelIndex}
              targetMessageId={targetMessageId}
              setShowThread={setShowThread}
            />
          </Stack>
        ) : (
          <Stack h={"100%"} justify={"flex-end"}>
            <ScrollArea type="never" viewportRef={viewport}>
              <Box h={"3.8rem"}></Box>
              <Stack gap={1} mx={20}>
                {currentChannel?.message &&
                  currentChannel.message.map((m, index) => {
                    return (
                      <MessageBox
                        key={m.id}
                        channelIndex={currentChannelIndex}
                        messageId={m.id}
                        messageIndex={index}
                        setTargetMessageId={setTargetMessageId}
                        setShowThread={setShowThread}
                        showThread={showThread}
                      />
                    );
                  })}
                <Box style={{}} h={"6rem"} my={6}></Box>
              </Stack>
            </ScrollArea>
          </Stack>
        )}

        {!showThread && (
          <Box
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              left: 0,
            }}
          >
            <MessageSender channelIndex={currentChannelIndex} />
          </Box>
        )}
      </Stack>
      <AddUserModal
        addUserOpened={addUserOpened}
        closeAddUserFunction={closeAddUserFunction}
        currentChannel={currentChannel}
        currentChannelIndex={currentChannelIndex}
      />

      <ChannelSettingsModal
        channelSettingsOpened={channelSettingsOpened}
        closeChannelSettingsFunction={closeChannelSettingsFunction}
        currentChannel={currentChannel}
        currentChannelIndex={currentChannelIndex}
      />
    </>
  );

  function scrollToBottom() {
    if (viewport.current != null) {
      viewport.current!.scrollTo({
        top: viewport.current!.scrollHeight,
        behavior: "instant",
      });
    }
  }
  function handleReceivedMessage(
    data: SubscriptionResult<OnMessageSentSubscription, any>
  ) {
    const receivedMessage = data.data;
    if (receivedMessage) {
      const latestMessage: messageType = {
        id: receivedMessage.onMessageSent.id,
        text: receivedMessage.onMessageSent.text,
        date: receivedMessage.onMessageSent.date,
        user: {
          fullName: receivedMessage.onMessageSent.user.fullName,
          username: receivedMessage.onMessageSent.user.username,
        },
        threads: [],
      };

      setChannels((prevChannel) => {
        const newChannels = [...prevChannel];
        if (newChannels[currentChannelIndex].message == undefined) {
          newChannels[currentChannelIndex].message = [];
        }
        newChannels[currentChannelIndex].message.push(latestMessage);
        return newChannels;
      });
    }
  }
}

type AddUserModalProps = {
  addUserOpened: boolean;
  closeAddUserFunction: () => void;
  currentChannel: channelType | undefined;
  currentChannelIndex: number;
};
function AddUserModal({
  addUserOpened,
  closeAddUserFunction,
  currentChannel,
  currentChannelIndex,
}: AddUserModalProps) {
  return (
    <Modal
      title={`Add member to "${currentChannel?.name}" channel`}
      size={"xl"}
      opened={addUserOpened}
      centered
      onClose={closeAddUserFunction}
      withCloseButton={false}
      overlayProps={{
        backgroundOpacity: 0.4,
        blur: 4,
      }}
      styles={{
        title: {
          fontWeight: "bold",
          fontSize: "1.5rem",
        },
      }}
    >
      <AddMemberToChannel
        currentChannel={currentChannel}
        currentChannelIndex={currentChannelIndex}
      />
    </Modal>
  );
}

type ChannelSettingsModalProps = {
  channelSettingsOpened: boolean;
  closeChannelSettingsFunction: () => void;
  currentChannel: channelType | undefined;
  currentChannelIndex: number;
};
function ChannelSettingsModal({
  channelSettingsOpened,
  closeChannelSettingsFunction,
  currentChannel,
  currentChannelIndex,
}: ChannelSettingsModalProps) {
  return (
    <Modal
      title={`"${currentChannel?.name}" channel settings`}
      size={"xl"}
      opened={channelSettingsOpened}
      centered
      onClose={closeChannelSettingsFunction}
      withCloseButton={false}
      overlayProps={{
        backgroundOpacity: 0.4,
        blur: 4,
      }}
      styles={{
        title: {
          fontWeight: "bold",
          fontSize: "1.5rem",
        },
      }}
    >
      <ChannelSettings
        currentChannel={currentChannel}
        currentChannelIndex={currentChannelIndex}
        closeChannelSettingsFunction={closeChannelSettingsFunction}
      />
    </Modal>
  );
}

export default ChannelRoom;
