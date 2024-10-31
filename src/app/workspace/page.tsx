"use client";

import {
  Button,
  Stack,
  Group,
  Title,
  Avatar,
  TextInput,
  SimpleGrid,
  ScrollArea,
  Modal,
  DEFAULT_THEME,
  Popover,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { fetchUserAttributes } from "aws-amplify/auth";
import outputs from "../../../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { MdAdd } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { IoTelescope } from "react-icons/io5";
import { ChangeEvent, useState, useEffect, useRef } from "react";
import { useLazyQuery } from "@apollo/client";
import { gql } from "../../__generated__/gql";
import WorkspaceCard from "../components/workspaceCard";
import CreateWorkspaceModal from "../components/createWorkspaceModal";
import { useRouter } from "next/navigation";
import WorkspacesLoading from "../components/workspacesLoading";
import UserAccountPopOver from "../components/UserAccountPopover";
import UserSettingModal from "../components/UserSettingsModal";

Amplify.configure(outputs);

const GET_USER = gql(`
  query UserByUsername($username: String!) {
  userByUsername(username: $username) {
    username
    fullName
    email
    workspaces {
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

export default function AllWorkspaces() {
  const [
    createWorkspaceOpened,
    { open: createWorkspaceOpen, close: createWorkspaceClose },
  ] = useDisclosure(false);

  const [
    userSettingOpened,
    { open: userSettingOpen, close: userSettingClose },
  ] = useDisclosure(false);

  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [workspaces, setWorkspaces] = useState<workspaceState[]>([]);
  const [searchableWorkspaces, setSearchableWorkspaces] = useState<
    workspaceState[]
  >([]);
  const [isSearching, setIsSearching] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(true);
  const [getUser] = useLazyQuery(GET_USER);
  let currentUsername = useRef("");

  useEffect(() => {
    handleInitialLoad();
  }, []);

  if (loading) return <WorkspacesLoading />;

  return (
    <Stack w={"100%"} h={"100vh"} bg={"gray.0"} px={15} py={10}>
      <Group w={"100%"} justify={"space-between"}>
        <Group gap={5}>
          <Title size={"2.5rem"}>Welcome Back,</Title>
          <Title size={"2.5rem"} c={"violet.8"}>
            {fullName}
          </Title>
        </Group>

        <Popover>
          <Popover.Target>
            <Avatar name={fullName} size={"lg"} />
          </Popover.Target>
          <Popover.Dropdown>
            <UserAccountPopOver
              fullName={fullName}
              email={email}
              username={currentUsername.current}
              userSettingOpen={userSettingOpen}
            />
          </Popover.Dropdown>
        </Popover>
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
          onChange={(e) => handleSearch(e)}
        />
        <Button
          size="md"
          color="violet.8"
          leftSection={<MdAdd size={"2rem"} />}
          onClick={createWorkspaceOpen}
        >
          Create Workspace
        </Button>
      </Group>

      {workspaces.length == 0 ||
      (searchableWorkspaces.length == 0 && isSearching) ? (
        <Stack style={{ flexGrow: "1" }} justify="center" align="center">
          <IoTelescope size={"12rem"} color={DEFAULT_THEME.colors.violet[8]} />
          <Title c={"violet.8"}>Create or Join a workspace!</Title>
        </Stack>
      ) : isSearching ? (
        <ScrollArea>
          <SimpleGrid cols={3} px={15}>
            {searchableWorkspaces.map((w) => (
              <WorkspaceCard key={w.id} workspaceId={w.id} name={w.name} />
            ))}
          </SimpleGrid>
        </ScrollArea>
      ) : (
        <ScrollArea>
          <SimpleGrid cols={3} px={15}>
            {workspaces.map((w) => (
              <WorkspaceCard key={w.id} workspaceId={w.id} name={w.name} />
            ))}
          </SimpleGrid>
        </ScrollArea>
      )}
      <Modal
        size={"md"}
        opened={createWorkspaceOpened}
        onClose={createWorkspaceClose}
        withCloseButton={false}
        title="Create Workspace"
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
        <CreateWorkspaceModal
          closeFunction={createWorkspaceClose}
          username={currentUsername.current}
          setWorkspaces={setWorkspaces}
        />
      </Modal>

      <Modal
        size={"lg"}
        opened={userSettingOpened}
        onClose={userSettingClose}
        withCloseButton={false}
        title="Account Settings"
        centered
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
        <UserSettingModal
          closeFunction={userSettingClose}
          fullName={fullName}
          username={currentUsername.current}
          email={email}
          setFullName={setFullName}
        />
      </Modal>
    </Stack>
  );

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.currentTarget.value);

    if (event.currentTarget.value.trim() != "") {
      // is searching
      setIsSearching(true);
      const filteredWorkspace = workspaces.filter((w) =>
        w.name
          .toLocaleLowerCase()
          .includes(event.currentTarget.value.toLocaleLowerCase())
      );

      setSearchableWorkspaces(filteredWorkspace);
    } else {
      setIsSearching(false);
    }
  }

  async function handleInitialLoad() {
    try {
      const { preferred_username: username } = await fetchUserAttributes();
      if (username != undefined) {
        currentUsername.current = username;
        const { data } = await getUser({
          fetchPolicy: "network-only",
          variables: { username: username },
        });
        if (data != undefined) {
          const currentUser = data.userByUsername;
          setFullName(currentUser.fullName);
          setEmail(currentUser.email);
          setWorkspaces(() => {
            return currentUser.workspaces.map((w) => {
              return { id: w.id as string, name: w.name };
            });
          });
          setLoading(false);
        }
      }
    } catch (error) {
      router.push("login");
    }
  }
}
