import { Button, Stack, TextInput } from "@mantine/core";
import { Dispatch, SetStateAction, useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "../../__generated__/gql";
import { ChannelType } from "@/__generated__/graphql";
import { ChatContext } from "../contexts/chatContext";

const CREATE_PUBLIC_CHANNEL = gql(`
    mutation CreateChannel($input: CreateChannelInput!) {
  createChannel(input: $input) {
    channel {
      id
      name
      type
    }
  }
}
    `);

type CreateChannelModalProps = {
  closeFunction: () => void;
  channelType: "PUBLIC" | "PRIVATE" | "DIRECT";
};

function CreateChannelModal({
  closeFunction,
  channelType,
}: CreateChannelModalProps) {
  const [nameError, setNameError] = useState("");
  const [name, setName] = useState("");
  const [enableCreateChannel, setEnableCreateChannel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createChannel] = useMutation(CREATE_PUBLIC_CHANNEL);
  const { workspaceId, setChannels } = useContext(ChatContext);
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
        Create Channel
      </Button>
    </Stack>
  );

  async function handleChannelCreation() {
    setLoading(true);
    if (channelType == "PUBLIC") {
      const { data } = await createChannel({
        variables: {
          input: {
            workspaceId: workspaceId,
            name: name,
            type: ChannelType.Public,
          },
        },
      });
      setChannels((prevChannels) => {
        const newChannels = [...prevChannels];
        if (data?.createChannel.channel != undefined) {
          newChannels.push({
            id: data?.createChannel.channel?.id,
            name: data?.createChannel.channel?.name,
            type: "PUBLIC",
          });
        }
        return newChannels;
      });
    }

    closeFunction();
  }
}

export default CreateChannelModal;
