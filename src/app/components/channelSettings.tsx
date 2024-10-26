import { Group, Stack, TextInput, Button, Modal } from "@mantine/core";
import { channelType } from "../contexts/chatContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { gql } from "@/__generated__/gql";
import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { ChatContext } from "../contexts/chatContext";

const RENAME_CHANNEL = gql(`
    mutation UpdateChannelName($input: UpdateChannelNameInput!) {
  updateChannelName(input: $input) {
    channel {
      id
      name
    }
  }
}
    `);

const DELETE_CHANNEL = gql(`
        mutation DeleteChannel($input: DeleteChannelInput!) {
  deleteChannel(input: $input) {
    channel {
      id
      name
    }
  }
}
        `);

type ChannelSettingsProps = {
  currentChannel: channelType | undefined;
  currentChannelIndex: number;
  closeChannelSettingsFunction: () => void;
};

function ChannelSettings({
  currentChannel,
  currentChannelIndex,
  closeChannelSettingsFunction,
}: ChannelSettingsProps) {
  const [channelName, setChannelName] = useState<string>(
    currentChannel ? currentChannel.name : ""
  );
  const [opened, { open, close }] = useDisclosure();
  const [enableSave, setEnableSave] = useState(false);
  const [deleteChannel, setDeleteChannel] = useState(false);

  const { setChannels } = useContext(ChatContext);
  const [renameChannel] = useMutation(RENAME_CHANNEL);
  const [deleteChannelFunction] = useMutation(DELETE_CHANNEL);

  useEffect(() => {
    if (deleteChannel) {
      console.log("Delete is true");
      handleDeleteChannel();
      closeChannelSettingsFunction();
    }
  }, [deleteChannel]);
  return (
    <>
      <Stack>
        <Group align={"end"}>
          <TextInput
            style={{ flexGrow: 1 }}
            styles={{
              label: { fontWeight: "bold", fontSize: "1.3rem" },
            }}
            size="lg"
            label={"Channel Name"}
            value={channelName}
            variant={"filled"}
            onChange={(event) => {
              setChannelName(event.currentTarget.value);
              if (event.currentTarget.value.trim() != "") {
                setEnableSave(true);
              } else {
                setEnableSave(false);
              }
            }}
          />
          <Button
            size="lg"
            color="violet.8"
            disabled={!enableSave}
            onClick={() => {
              handleChannelNameChange();
            }}
          >
            Save
          </Button>
        </Group>
        <Button
          size="lg"
          color="red.8"
          variant="outline"
          leftSection={<RiDeleteBin6Line size={"1.5rem"} />}
          onClick={open}
        >
          Delete Channel
        </Button>
      </Stack>
      <ConfirmDelete
        opened={opened}
        close={close}
        channelName={channelName}
        setDelete={setDeleteChannel}
      />
    </>
  );
  async function handleChannelNameChange() {
    try {
      const { data } = await renameChannel({
        variables: {
          input: { channelId: currentChannel?.id, name: channelName.trim() },
        },
      });

      if (data) {
        setChannels((prevChannel) => {
          const updatedChannel = [...prevChannel];
          updatedChannel[currentChannelIndex].name = channelName.trim();
          return updatedChannel;
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteChannel() {
    try {
      await deleteChannelFunction({
        variables: { input: { channelId: currentChannel?.id } },
      });

      setChannels((prevChannel) => {
        const updatedChannel = [...prevChannel];
        updatedChannel.splice(currentChannelIndex, 1);
        return updatedChannel;
      });
    } catch (error) {
      console.log(error);
    }
  }
}

type ConfirmDeleteProps = {
  opened: boolean;
  close: () => void;
  channelName: string;
  setDelete: Dispatch<SetStateAction<boolean>>;
};
function ConfirmDelete({
  opened,
  channelName,
  close,
  setDelete,
}: ConfirmDeleteProps) {
  const [keepChannel, setKeepChannel] = useState(false);
  return (
    <>
      <Modal
        title={`Confirm deletion of "${channelName}" channel?`}
        size={"md"}
        opened={opened}
        centered
        onClose={() => {
          if (keepChannel) {
            close();
          }
        }}
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
        <Group grow>
          <Button
            size="lg"
            color="violet.8"
            onClick={() => {
              close();
            }}
          >
            Keep
          </Button>
          <Button
            size="lg"
            color="red.8"
            variant="outline"
            onClick={() => {
              setDelete(true);
              close();
            }}
          >
            Delete
          </Button>
        </Group>
      </Modal>
    </>
  );
}

export default ChannelSettings;
