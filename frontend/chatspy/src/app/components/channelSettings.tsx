import { Group, Stack, TextInput, Button, Modal } from "@mantine/core";
import { channelType } from "../contexts/chatContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Dispatch, SetStateAction, useState } from "react";
import { useDisclosure } from "@mantine/hooks";

type ChannelSettingsProps = {
  currentChannel: channelType | undefined;
  currentChannelIndex: number;
};

function ChannelSettings({ currentChannel }: ChannelSettingsProps) {
  const [channelName, setChannelName] = useState<string>(
    currentChannel ? currentChannel.name : ""
  );
  const [opened, { open, close }] = useDisclosure();
  const [enableSave, setEnableSave] = useState(false);
  const [deleteChannel, setDeleteChannel] = useState(false);
  return (
    <>
      <Stack>
        <Group align={"end"}>
          <TextInput
            style={{ flexGrow: 1 }}
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
              handleNameChannelNameChange;
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
      {/* <Modal
        title={`Confirm delete "${currentChannel?.name}" channel?`}
        size={"md"}
        opened={opened}
        centered
        onClose={close}
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
          <Button size="lg" color="violet.8" onClick={() => {}}>
            Keep
          </Button>
          <Button size="lg" color="red.8" variant="outline" onClick={() => {}}>
            Delete
          </Button>
        </Group>
      </Modal> */}
    </>
  );
  function handleNameChannelNameChange() {}
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
        title={`Confirm delete "${channelName}" channel?`}
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
