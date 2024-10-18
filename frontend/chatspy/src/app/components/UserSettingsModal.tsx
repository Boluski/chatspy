import { Button, Group, Modal, Stack, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

type UserSettingModalProps = {
  fullName: string;
  closeFunction: () => void;
};
function UserSettingModal({ fullName, closeFunction }: UserSettingModalProps) {
  const [opened, { open, close }] = useDisclosure();
  const [newFullName, setNewFullName] = useState(fullName);
  const [enableSave, setEnableSave] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  useEffect(() => {
    if (deleteUser) {
      console.log("Deleted");
      closeFunction();
    }
  }, [deleteUser]);
  return (
    <>
      <Stack>
        <Group align={"end"}>
          <TextInput
            style={{ flexGrow: 1 }}
            size="lg"
            label={"Full Name"}
            value={newFullName}
            variant={"filled"}
            onChange={(event) => {
              setNewFullName(event.currentTarget.value);
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
              // handleChannelNameChange();
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
          Delete Account
        </Button>
      </Stack>
      <ConfirmDelete opened={opened} close={close} setDelete={setDeleteUser} />
    </>
  );
}

type ConfirmDeleteProps = {
  opened: boolean;
  close: () => void;
  setDelete: Dispatch<SetStateAction<boolean>>;
};
function ConfirmDelete({ opened, close, setDelete }: ConfirmDeleteProps) {
  const [keepChannel, setKeepChannel] = useState(false);
  return (
    <>
      <Modal
        title={"Confirm account deletion?"}
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

export default UserSettingModal;
