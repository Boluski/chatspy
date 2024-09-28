import { ActionIcon, DEFAULT_THEME, Stack } from "@mantine/core";
import { FaHashtag } from "react-icons/fa";
import {
  IoLockClosed,
  IoPersonSharp,
  IoSettingsOutline,
} from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { UserContext } from "../contexts/userContext";
import { useContext } from "react";

export default function WorkspaceNav() {
  const { currentWorkspace } = useContext(UserContext);
  return (
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

      {currentWorkspace?.isAdmin ? (
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
      ) : null}
    </Stack>
  );
}
