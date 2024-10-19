"use client";
import { Amplify } from "aws-amplify";
import outputs from "../../../../amplify_outputs.json";
import {
  Avatar,
  Button,
  Group,
  Stack,
  Title,
  DEFAULT_THEME,
} from "@mantine/core";
import { MdAdd } from "react-icons/md";

type JoinProps = {
  params: { workspaceID: string };
};
Amplify.configure(outputs);
function Join({ params }: JoinProps) {
  return (
    <Stack h={"100vh"} bg={"violet.0"} px={20} py={10}>
      <Group>
        <Title c={"violet.8"}>Chatspy</Title>
      </Group>
      <Stack pt={"4rem"} gap={"2rem"} h={"100%"} align="center">
        <Group gap={16}>
          <Title fz={"3rem"}>Join the</Title>
          <Title fz={"3rem"} c={"violet.8"}>
            Bible Study
          </Title>
          <Title fz={"3rem"}>workspace!</Title>
        </Group>
        <Group wrap={"nowrap"} gap={0}>
          <Avatar.Group spacing={"md"}>
            <Avatar
              name="Bolu Ajibola"
              size={"xl"}
              color={"#fff"}
              styles={{
                root: { borderColor: DEFAULT_THEME.colors.violet[8] },
                placeholder: { color: DEFAULT_THEME.colors.violet[8] },
              }}
            />
            <Avatar
              name="Bolu Ajibola"
              size={"xl"}
              color={"#fff"}
              styles={{
                root: { borderColor: DEFAULT_THEME.colors.violet[8] },
                placeholder: { color: DEFAULT_THEME.colors.violet[8] },
              }}
            />
            <Avatar
              name="Bolu Ajibola"
              size={"xl"}
              color={"#fff"}
              styles={{
                root: { borderColor: DEFAULT_THEME.colors.violet[8] },
                placeholder: { color: DEFAULT_THEME.colors.violet[8] },
              }}
            />
            <Avatar
              size={"xl"}
              color={"#fff"}
              styles={{
                root: { borderColor: DEFAULT_THEME.colors.violet[8] },
                placeholder: { color: DEFAULT_THEME.colors.violet[8] },
              }}
            >
              +20
            </Avatar>
          </Avatar.Group>
        </Group>
        <Button
          size="xl"
          color="violet.8"
          leftSection={<MdAdd size={"2rem"} />}
        >
          Join workspace
        </Button>
      </Stack>
    </Stack>
  );
}

export default Join;
