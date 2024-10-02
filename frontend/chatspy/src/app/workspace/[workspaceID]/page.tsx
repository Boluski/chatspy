"use client";
import {
  Stack,
  Avatar,
  Title,
  Button,
  Group,
  TextInput,
  DEFAULT_THEME,
  ActionIcon,
  Tabs,
  TabsList,
  TabsTab,
  Modal,
  TabsPanel,
} from "@mantine/core";
import { IoSearchSharp } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa6";
import { IoLockClosed } from "react-icons/io5";
import { IoPersonSharp } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import WorkspaceHeader from "@/app/components/workspaceHeader";
import WorkspaceNav from "@/app/components/workspaceNav";
import { UserContext } from "../../contexts/userContext";
import { useContext, useEffect, useState } from "react";
import { gql } from "../../../__generated__/gql";
import { useLazyQuery } from "@apollo/client";
import { Amplify } from "aws-amplify";
import outputs from "../../../../amplify_outputs.json";
import { fetchUserAttributes } from "aws-amplify/auth";
import { useDisclosure } from "@mantine/hooks";
import CreateChannelModal from "@/app/components/createChannelModal";

type Workspace = {
  params: { workspaceID: string };
};

const USER_DATA = gql(`
  query UserData($username: String!) {
userByUsername(username: $username) {
  username
  fullName
  email
  workspaces {
    id
    name
    createdBy
  }
}
}
  `);

const CURRENT_WORKSPACE = gql(`
query WorkspaceByID($workspaceId: UUID!, $username: String!) {
workspaceByID(workspaceID: $workspaceId, username: $username) {
  id
  name
  createdBy
}
}
  `);

Amplify.configure(outputs);
export default function Workspace({ params }: Workspace) {
  const [getUserData] = useLazyQuery(USER_DATA);
  const [getCurrentWorkspace] = useLazyQuery(CURRENT_WORKSPACE);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [
    createChannelOpened,
    { open: createChannelOpen, close: createChannelClose },
  ] = useDisclosure(false);
  const {
    isAuthenticated,
    currentWorkspace,
    setIsAuthenticated,
    setEmail,
    setUsername,
    setFullName,
    setUserWorkspaces,
    setCurrentWorkspace,
  } = useContext(UserContext);

  useEffect(() => {
    handleInitialLoad();
  }, []);

  return (
    <>
      <Stack w={"100wh"} h={"100vh"} bg={"gray.0"} px={15} py={10}>
        {loading ? (
          <>loading</>
        ) : isAuthenticated ? (
          isAuthorized ? (
            <>
              <WorkspaceHeader />
              <Group
                w={"100%"}
                style={{ flexGrow: "1" }}
                align={"start"}
                gap={0}
              >
                <WorkspaceNav />
                <Tabs
                  style={{ flexGrow: "1" }}
                  h={"100%"}
                  color="violet.2"
                  defaultValue="gallery"
                  orientation="vertical"
                  variant="pills"
                  radius={0}
                  styles={{
                    list: {
                      borderRight: `solid 2px ${DEFAULT_THEME.colors.dark[0]}`,
                    },
                    tab: {
                      width: "20rem",
                    },
                    tabLabel: { fontSize: "1.5rem" },
                  }}
                >
                  <TabsList>
                    {currentWorkspace?.isAdmin ? (
                      <Button
                        my={0}
                        size="lg"
                        variant="light"
                        color="gray"
                        leftSection={<MdAdd size={"2rem"} />}
                        onClick={createChannelOpen}
                      >
                        Create New Channel
                      </Button>
                    ) : null}

                    <TabsTab value="general">General</TabsTab>
                    <TabsTab value="announcements">Announcements</TabsTab>
                    <TabsTab value="welcome">Welcome</TabsTab>
                  </TabsList>

                  <TabsPanel value="general">General</TabsPanel>
                  <TabsPanel value="announcements">Announcements</TabsPanel>
                  <TabsPanel value="welcome">Welcome</TabsPanel>
                </Tabs>
              </Group>
            </>
          ) : (
            <> Not Authorized</>
          )
        ) : (
          <>Not Authenticated</>
        )}
      </Stack>
      <Modal
        size={"md"}
        onClose={createChannelClose}
        opened={createChannelOpened}
        withCloseButton={false}
        title="Create Public Channel"
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
        <CreateChannelModal closeFunction={createChannelClose} />
      </Modal>
    </>
  );
  async function handleInitialLoad() {
    // Authentication
    try {
      const { preferred_username } = await fetchUserAttributes();

      if (preferred_username) {
        // User is authenticated
        setIsAuthenticated(true);
        setUsername(preferred_username);

        const { data } = await getUserData({
          variables: { username: preferred_username },
        });
        if (data) {
          const allWorkspaces = data.userByUsername.workspaces.map((w) => {
            return { id: w.id, name: w.name, createdBy: w.createdBy };
          });

          setEmail(data.userByUsername.email);
          setFullName(data.userByUsername.fullName);
          setUserWorkspaces(allWorkspaces);
          const workspaceIndex = allWorkspaces.findIndex(
            (w) => w.id == params.workspaceID
          );
          //
          if (workspaceIndex != -1) {
            // User is authorized
            setIsAuthorized(true);
            const { data: currentWorkspaceData } = await getCurrentWorkspace({
              variables: {
                username: preferred_username,
                workspaceId: allWorkspaces[workspaceIndex].id,
              },
            });

            if (currentWorkspaceData != null) {
              // Access to the current workspace data
              const isAdmin =
                currentWorkspaceData.workspaceByID.createdBy ==
                preferred_username
                  ? true
                  : false;

              setCurrentWorkspace({
                id: currentWorkspaceData.workspaceByID.id,
                name: currentWorkspaceData.workspaceByID.name,
                createdBy: currentWorkspaceData.workspaceByID.createdBy,
                isAdmin: isAdmin,
              });
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }
}
