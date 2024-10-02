import { Button, Stack, TextInput } from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";

type CreateChannelModalProps = {
  closeFunction: () => void;
};

function CreateChannelModal({ closeFunction }: CreateChannelModalProps) {
  const [nameError, setNameError] = useState("");
  const [name, setName] = useState("");
  const [enableCreateChannel, setEnableCreateChannel] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <Stack w={"100%"}>
      <TextInput
        onChange={(event) => {
          setName(event.currentTarget.value.trim());
          if (event.currentTarget.value.trim() != "") {
            setNameError("");
            setEnableCreateChannel(true);
          } else {
            setNameError("Workspace must have a name");
            setEnableCreateChannel(false);
          }
        }}
        error={nameError}
        styles={{ label: { fontWeight: "bold", fontSize: "1.3rem" } }}
        label={"Channel name:"}
        size="md"
      />
      <Button
        disabled={!enableCreateChannel}
        onClick={handleChannelCreation}
        size="md"
        color="violet.8"
        loading={loading}
      >
        Create Workspace
      </Button>
    </Stack>
  );

  function handleChannelCreation() {
    setLoading(true);
    console.log(name);
    closeFunction();
  }
}

export default CreateChannelModal;
