import { ActionIcon, DEFAULT_THEME, Modal, Stack } from "@mantine/core";
import { FaHashtag } from "react-icons/fa";
import {
  IoLockClosed,
  IoPersonSharp,
  IoSettingsOutline,
} from "react-icons/io5";
import { useDisclosure } from "@mantine/hooks";
import { MdAdd } from "react-icons/md";
import { UserContext } from "../contexts/userContext";
import { useContext } from "react";
import AddMemberModal from "./addMemberModal";

export default function WorkspaceNav() {
  const { currentWorkspace } = useContext(UserContext);
  const [addMemberOpened, { open: addMemberOpen, close: addMemberClose }] =
    useDisclosure();
  return (
    <>
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
              onClick={addMemberOpen}
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
      <Modal
        size={"lg"}
        opened={addMemberOpened}
        onClose={addMemberClose}
        withCloseButton={false}
        title="Add Team Members"
        // centered
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
        <AddMemberModal closeFunction={addMemberClose} />
      </Modal>
    </>
  );
}
