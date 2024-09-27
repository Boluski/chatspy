"use Client";
import {
  Stack,
  Avatar,
  Title,
  Button,
  Group,
  TextInput,
  DEFAULT_THEME,
  ActionIcon,
} from "@mantine/core";
import { IoSearchSharp } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa6";
import { IoLockClosed } from "react-icons/io5";
import { IoPersonSharp } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import WorkspaceHeader from "@/app/components/workspaceHeader";

type Workspace = {
  params: { workspaceID: string };
};

export default function Workspace({ params }: Workspace) {
  return (
    <Stack w={"100wh"} h={"100vh"} bg={"gray.0"} px={15} py={10}>
      <WorkspaceHeader />
      <Stack
        w={"fit-content"}
        h={"100%"}
        justify={"space-between"}
        style={{ borderRight: `solid 2px ${DEFAULT_THEME.colors.dark[0]}` }}
        pr={"sm"}
      >
        <Stack>
          <ActionIcon
            color="gray"
            variant="light"
            size="xl"
            style={{ width: "4rem", height: "4rem" }}
          >
            <FaHashtag size={"2.5rem"} />
          </ActionIcon>
          <ActionIcon
            color="gray"
            variant="light"
            size="xl"
            style={{ width: "4rem", height: "4rem" }}
          >
            <IoLockClosed size={"2.5rem"} />
          </ActionIcon>
          <ActionIcon
            color="gray"
            variant="light"
            size="xl"
            style={{ width: "4rem", height: "4rem" }}
          >
            <IoPersonSharp size={"2.5rem"} />
          </ActionIcon>
        </Stack>

        <Stack>
          <ActionIcon
            color="violet.8"
            variant="light"
            size="xl"
            style={{ width: "4rem", height: "4rem" }}
          >
            <MdAdd size={"2.5rem"} />
          </ActionIcon>
          <ActionIcon
            color="violet.8"
            variant="light"
            size="xl"
            style={{ width: "4rem", height: "4rem" }}
          >
            <IoSettingsOutline size={"2.5rem"} />
          </ActionIcon>
        </Stack>
      </Stack>
    </Stack>
  );
}
