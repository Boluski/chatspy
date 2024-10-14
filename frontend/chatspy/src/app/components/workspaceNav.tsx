import { ActionIcon, DEFAULT_THEME, Modal, Stack, Title } from "@mantine/core";
import { FaHashtag } from "react-icons/fa";
import {
  IoLockClosed,
  IoPersonSharp,
  IoSettingsOutline,
} from "react-icons/io5";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { useDisclosure } from "@mantine/hooks";
import { MdAdd } from "react-icons/md";
import { UserContext } from "../contexts/userContext";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import AddMemberModal from "./addMemberModal";
import { ChannelType } from "@/__generated__/graphql";

type WorkspaceNavProps = {
  setChannelNav: Dispatch<SetStateAction<ChannelType>>;
};

export default function WorkspaceNav({ setChannelNav }: WorkspaceNavProps) {
  const { currentWorkspace } = useContext(UserContext);
  const [addMemberOpened, { open: addMemberOpen, close: addMemberClose }] =
    useDisclosure();

  const [enablePublic, setEnablePublic] = useState(false);
  const [enablePrivate, setEnablePrivate] = useState(true);
  const [enableDirect, setEnableDirect] = useState(true);

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
          <Stack align="center" gap={"0.5rem"}>
            <ActionIcon
              disabled={!enablePublic}
              color="gray"
              variant="light"
              size="xl"
              style={{ width: "4rem", height: "4rem" }}
              onClick={() => {
                setChannelNav(ChannelType.Public);
                setEnablePublic(false);
                setEnablePrivate(true);
                setEnableDirect(true);
              }}
            >
              <FaHashtag size={"2.5rem"} />
            </ActionIcon>
            <Title
              order={4}
              c={"gray.6"}
              w={"5rem"}
              style={{ textAlign: "center" }}
            >
              Public
            </Title>
          </Stack>
          <Stack align="center" gap={"0.5rem"}>
            <ActionIcon
              disabled={!enablePrivate}
              color="gray"
              variant="light"
              size="xl"
              style={{ width: "4rem", height: "4rem" }}
              onClick={() => {
                setChannelNav(ChannelType.Private);
                setEnablePublic(true);
                setEnablePrivate(false);
                setEnableDirect(true);
              }}
            >
              <IoLockClosed size={"2.5rem"} />
            </ActionIcon>
            <Title
              order={4}
              c={"gray.6"}
              w={"5rem"}
              style={{ textAlign: "center" }}
            >
              Private
            </Title>
          </Stack>
          <Stack align="center" gap={"0.5rem"}>
            <ActionIcon
              disabled={!enableDirect}
              color="gray"
              variant="light"
              size="xl"
              style={{ width: "4rem", height: "4rem" }}
              onClick={() => {
                setChannelNav(ChannelType.Direct);
                setEnablePublic(true);
                setEnablePrivate(true);
                setEnableDirect(false);
              }}
            >
              <HiOutlineChatBubbleLeftRight size={"2.5rem"} />
            </ActionIcon>
            <Title
              order={4}
              c={"gray.6"}
              w={"5rem"}
              style={{ textAlign: "center" }}
            >
              DM
            </Title>
          </Stack>
        </Stack>

        {currentWorkspace?.isAdmin ? (
          <Stack>
            <Stack align="center" gap={"0.5rem"}>
              <ActionIcon
                color="violet.8"
                variant="light"
                size="xl"
                style={{ width: "4rem", height: "4rem" }}
                onClick={addMemberOpen}
              >
                <MdAdd size={"2.5rem"} />
              </ActionIcon>
              <Title
                order={4}
                c={"gray.6"}
                w={"5rem"}
                style={{ textAlign: "center" }}
              >
                Add Member
              </Title>
            </Stack>

            <Stack align="center" gap={"0.5rem"}>
              <ActionIcon
                color="violet.8"
                variant="light"
                size="xl"
                style={{ width: "4rem", height: "4rem" }}
              >
                <IoSettingsOutline size={"2.5rem"} />
              </ActionIcon>
              <Title
                order={4}
                c={"gray.6"}
                w={"5rem"}
                style={{ textAlign: "center" }}
              >
                Setting
              </Title>
            </Stack>
          </Stack>
        ) : null}
      </Stack>
      <Modal
        size={"lg"}
        opened={addMemberOpened}
        onClose={addMemberClose}
        withCloseButton={false}
        title="Add Team Members"
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
