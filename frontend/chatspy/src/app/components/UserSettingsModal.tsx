import { Button, Group, Modal, Stack, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { gql } from "@/__generated__/gql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { deleteUser } from "aws-amplify/auth";

const UPDATE_USER_FULL_NAME = gql(`
    mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    user {
      username
    }
  }
}
    `);

const DELETE_USER = gql(`
    mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    user {
      username
    }
  }
}
    `);

type UserSettingModalProps = {
  fullName: string;
  email: string;
  username: string;
  closeFunction: () => void;
  setFullName: Dispatch<SetStateAction<string>>;
};
function UserSettingModal({
  fullName,
  closeFunction,
  email,
  username,
  setFullName,
}: UserSettingModalProps) {
  const [opened, { open, close }] = useDisclosure();
  const [newFullName, setNewFullName] = useState(fullName);
  const [enableSave, setEnableSave] = useState(false);
  const [canDeleteUser, setCanDeleteUser] = useState(false);
  const [updateUserFullName] = useMutation(UPDATE_USER_FULL_NAME);
  const [deleteUserFunction] = useMutation(DELETE_USER);
  const router = useRouter();
  useEffect(() => {
    if (canDeleteUser) {
      closeFunction();
      handleUserDeletion();
    }
  }, [canDeleteUser]);
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
              handleUserFullNameChange();
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
      <ConfirmDelete
        opened={opened}
        close={close}
        setDelete={setCanDeleteUser}
      />
    </>
  );

  async function handleUserFullNameChange() {
    try {
      await updateUserFullName({
        variables: {
          input: {
            fullName: newFullName.trim(),
            profilePicture: "",
            username: username,
            email: email,
          },
        },
      });
      setFullName(newFullName.trim());
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUserDeletion() {
    try {
      await deleteUserFunction({
        variables: { input: { username: username } },
      });
      await deleteUser();
      router.push("/signUp");
    } catch (error) {
      console.log(error);
    }
  }
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
