"use client";

import {
  Button,
  Stack,
  Group,
  Title,
  Avatar,
  Highlight,
  TextInput,
  SimpleGrid,
  ScrollArea,
  DEFAULT_THEME,
} from "@mantine/core";
import { signOut } from "aws-amplify/auth";
import outputs from "../../../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { MdAdd } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { IoTelescope } from "react-icons/io5";

Amplify.configure(outputs);

export default function Workspace() {
  return (
    <Stack
      w={"100%"}
      h={"100vh"}
      bg={"gray.0"}
      px={15}
      py={10}
      // gap={10}
    >
      <Group w={"100%"} justify={"space-between"}>
        <Highlight
          style={{ fontWeight: "bold", color: DEFAULT_THEME.colors.dark[5] }}
          highlightStyles={{
            color: DEFAULT_THEME.colors.violet[8],
            backgroundColor: "transparent",
          }}
          size={"2.5rem"}
          highlight={"Boluwatife Ajibola"}
        >
          Welcome Back, Boluwatife Ajibola
        </Highlight>
        <Avatar name="Boluwatife Ajibola" size={"lg"} />
      </Group>
      <Group justify={"space-between"} wrap={"nowrap"} px={15}>
        <Title size={"2.3rem"} c={"dark.9"}>
          Workspaces
        </Title>
        <TextInput
          style={{ flexGrow: "1" }}
          size="md"
          placeholder="Search Workspace"
          leftSection={<IoSearchSharp size={"1.5rem"} />}
        />
        <Button
          size="md"
          color="violet.8"
          leftSection={<MdAdd size={"2rem"} />}
        >
          Create Workspace
        </Button>
      </Group>

      <Stack style={{ flexGrow: "1" }} justify="center" align="center">
        <IoTelescope size={"12rem"} color={DEFAULT_THEME.colors.violet[8]} />
        <Title c={"violet.8"}>Create or Join a workspace!</Title>
      </Stack>

      {/* if There are workspaces */}
      {/* <ScrollArea>
        <SimpleGrid cols={3} px={15}>
          <Stack
            style={{
              border: `solid 2px ${DEFAULT_THEME.colors.dark[0]}`,
              borderRadius: "0.5rem",
            }}
            p={10}
            bg={"gray.1"}
          >
            <Title c={"dark.6"}>Spellblaze</Title>
            <Group justify={"flex-end"}>
              <Button variant="light" color="gray" size="md">
                Open Workspace
              </Button>
            </Group>
          </Stack>
        </SimpleGrid>
      </ScrollArea> */}

      {/* <Button onClick={async () => await signOut()}>Sign Out</Button> */}
    </Stack>
  );
}
