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
import WorkspaceNav from "@/app/components/workspaceNav";

type Workspace = {
  params: { workspaceID: string };
};

export default function Workspace({ params }: Workspace) {
  return (
    <Stack w={"100wh"} h={"100vh"} bg={"gray.0"} px={15} py={10}>
      <WorkspaceHeader />
      <WorkspaceNav />
    </Stack>
  );
}
