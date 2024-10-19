import {
  Avatar,
  Box,
  Button,
  Group,
  Modal,
  ScrollArea,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserContext, userType, workspaceType } from "../contexts/userContext";
import { MdOutlineRemove } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { useDisclosure } from "@mantine/hooks";
import { useMutation } from "@apollo/client";
import { gql } from "@/__generated__/gql";
import { useRouter } from "next/navigation";

const RENAME_WORKSPACE = gql(`
    mutation UpdateWorkspace($input: UpdateWorkspaceInput!) {
  updateWorkspace(input: $input) {
    workspace {
      id
      name
      createdBy
    }
  }
}
    `);

const REMOVE_USER_FROM_WORKSPACE = gql(`
    mutation RemoveUserFromWorkspace($input: RemoveUserFromWorkspaceInput!) {
  removeUserFromWorkspace(input: $input) {
    workspace {
      id
      name
      users {
        fullName
        username
      }
    }
  }
}
    `);

const DELETE_WORKSPACE = gql(`
    mutation DeleteWorkspace($input: DeleteWorkspaceInput!) {
  deleteWorkspace(input: $input) {
    workspace {
      id
    }
  }
}
    `);

type WorkspaceSettingsModalProps = {
  closeFunction: () => void;
};
function WorkspaceSettingsModal({
  closeFunction,
}: WorkspaceSettingsModalProps) {
  const router = useRouter();
  const { currentWorkspace, setCurrentWorkspace } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [workspaceName, setWorkspaceName] = useState<string>(
    currentWorkspace ? currentWorkspace.name : ""
  );
  const [enableSave, setEnableSave] = useState(false);
  const [deleteWorkspace, setDeleteWorkspace] = useState(false);
  const [opened, { open, close }] = useDisclosure();
  const [renameWorkspace] = useMutation(RENAME_WORKSPACE);
  const [deleteWorkspaceFunction] = useMutation(DELETE_WORKSPACE);

  useEffect(() => {
    if (deleteWorkspace) {
      closeFunction();
      handleWorkspaceDelete();
    }
  }, [deleteWorkspace]);
  return (
    <>
      <Stack>
        <Group align={"end"}>
          <TextInput
            style={{ flexGrow: 1 }}
            size="lg"
            label={"Workspace Name"}
            value={workspaceName}
            variant={"filled"}
            onChange={(event) => {
              setWorkspaceName(event.currentTarget.value);
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
              handleWorkspaceNameChange();
            }}
          >
            Save
          </Button>
        </Group>
        <Stack>
          <Title order={2}>Members</Title>
          <TextInput
            size="lg"
            variant="filled"
            placeholder="Search Member"
            leftSection={<IoSearchSharp size={"1.7rem"} />}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
          />
          <ScrollArea h={"20rem"} type="never">
            <Stack gap={5}>
              {currentWorkspace &&
                currentWorkspace.users
                  .filter((u) =>
                    u.fullName
                      .toLocaleLowerCase()
                      .includes(searchTerm.trim().toLocaleLowerCase())
                  )
                  .filter((u) => u.username != currentWorkspace.createdBy)
                  .map((u) => {
                    return (
                      <WorkspaceMember
                        key={currentWorkspace ? currentWorkspace?.id : ""}
                        workspaceId={
                          currentWorkspace ? currentWorkspace?.id : ""
                        }
                        user={u}
                        setCurrentWorkspace={setCurrentWorkspace}
                      />
                    );
                  })}
            </Stack>
          </ScrollArea>
        </Stack>
        <Button
          size="lg"
          color="red.8"
          variant="outline"
          leftSection={<RiDeleteBin6Line size={"1.5rem"} />}
          onClick={open}
        >
          Delete Workspace
        </Button>
      </Stack>
      <ConfirmDelete
        setDelete={setDeleteWorkspace}
        opened={opened}
        close={close}
        workspaceName={currentWorkspace ? currentWorkspace.name : ""}
      />
    </>
  );

  async function handleWorkspaceNameChange() {
    try {
      await renameWorkspace({
        variables: {
          input: {
            id: currentWorkspace ? currentWorkspace?.id : "",
            name: workspaceName.trim(),
            createdBy: currentWorkspace ? currentWorkspace?.createdBy : "",
          },
        },
      });

      setCurrentWorkspace((prevWorkspace) => {
        if (prevWorkspace) {
          const updatedWorkspace = { ...prevWorkspace };
          updatedWorkspace.name = workspaceName.trim();
          return updatedWorkspace;
        } else {
          return null;
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleWorkspaceDelete() {
    try {
      await deleteWorkspaceFunction({
        variables: {
          input: { id: currentWorkspace ? currentWorkspace.id : "" },
        },
      });

      router.push("/workspace");
    } catch (error) {
      console.log(error);
    }
  }
}

type workspaceMemberProps = {
  user: userType;
  workspaceId: string;
  setCurrentWorkspace: Dispatch<SetStateAction<workspaceType | null>>;
};
function WorkspaceMember({
  user,
  workspaceId,
  setCurrentWorkspace,
}: workspaceMemberProps) {
  const [removeUserFromWorkspace] = useMutation(REMOVE_USER_FROM_WORKSPACE);
  return (
    <Group py={10} align="center">
      <Avatar size={"lg"} name={user.fullName} />
      <Stack style={{ flexGrow: 1 }} gap={1}>
        <Title order={3}>{user.fullName}</Title>
        <Title order={6}>{user.username}</Title>
      </Stack>

      <Box w={"10rem"}>
        <Button
          w={"100%"}
          size="lg"
          color="red"
          variant="outline"
          leftSection={<MdOutlineRemove size={"2rem"} />}
          onClick={() => {
            handleRemoveUserFromWorkspace();
          }}
        >
          Remove
        </Button>
      </Box>
    </Group>
  );
  async function handleRemoveUserFromWorkspace() {
    try {
      const { data } = await removeUserFromWorkspace({
        variables: {
          input: { workspaceID: workspaceId, username: user.username },
        },
      });

      setCurrentWorkspace((prevWorkspace) => {
        if (prevWorkspace) {
          const updatedWorkspace = { ...prevWorkspace };
          if (data?.removeUserFromWorkspace.workspace) {
            updatedWorkspace.users = data.removeUserFromWorkspace.workspace
              .users as userType[];
          }
          return updatedWorkspace;
        } else {
          return null;
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}

type ConfirmDeleteProps = {
  opened: boolean;
  close: () => void;
  workspaceName: string;
  setDelete: Dispatch<SetStateAction<boolean>>;
};
function ConfirmDelete({
  opened,
  workspaceName,
  close,
  setDelete,
}: ConfirmDeleteProps) {
  const [keepChannel, setKeepChannel] = useState(false);
  return (
    <>
      <Modal
        title={`Confirm deletion of "${workspaceName}" workspace?`}
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

export default WorkspaceSettingsModal;
