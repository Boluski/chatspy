import { Stack, TextInput, Button } from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "../../__generated__/gql";

type CreateWorkspaceModalProps = {
  closeFunction: () => void;
  username: string;
  setWorkspaces: Dispatch<SetStateAction<workspaceState[]>>;
  appendWorkspaceToRef: (workspace: workspaceState) => void;
};

const CREATE_WORKSPACE = gql(`
mutation CreateWorkspace($input: CreateWorkspaceInput!) {
  createWorkspace(input: $input) {
    workspace {
      id
      name
    }
  }
}
    `);

type workspaceState = {
  id: string;
  name: string;
};

export default function CreateWorkspaceModal({
  closeFunction,
  username,
  setWorkspaces,
  appendWorkspaceToRef,
}: CreateWorkspaceModalProps) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [enableCreateWorkspace, setEnableCreateWorkspace] = useState(false);

  const [createWorkspace, { loading }] = useMutation(CREATE_WORKSPACE);

  return (
    <Stack w={"100%"}>
      <TextInput
        onChange={(event) => {
          setName(event.currentTarget.value.trim());
          if (event.currentTarget.value.trim() != "") {
            setNameError("");
            setEnableCreateWorkspace(true);
          } else {
            setNameError("Workspace must have a name");
            setEnableCreateWorkspace(false);
          }
        }}
        error={nameError}
        styles={{ label: { fontWeight: "bold", fontSize: "1.3rem" } }}
        label={"Workspace name:"}
        size="md"
      />
      <Button
        disabled={!enableCreateWorkspace}
        onClick={handleWorkspaceCreation}
        size="md"
        color="violet.8"
        loading={loading}
      >
        Create Workspace
      </Button>
    </Stack>
  );

  async function handleWorkspaceCreation() {
    console.log(username);
    const { data } = await createWorkspace({
      variables: { input: { username: username, name: name } },
    });
    if (data != undefined) {
      if (data.createWorkspace.workspace != null) {
        const createdWorkspace: workspaceState = data.createWorkspace.workspace;

        appendWorkspaceToRef(createdWorkspace);
        setWorkspaces((prev) => {
          const newWorkspaces = [...prev];
          newWorkspaces.push(createdWorkspace);
          return [...newWorkspaces];
        });
      }
    }
    setName("");
    closeFunction();
  }
}
