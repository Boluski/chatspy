"use client";
import {
  Stack,
  Button,
  Group,
  DEFAULT_THEME,
  Tabs,
  TabsList,
  TabsTab,
  Modal,
  TabsPanel,
  Box,
  Title,
} from "@mantine/core";
import { MdAdd, MdLocationSearching } from "react-icons/md";
import WorkspaceHeader from "@/app/components/workspaceHeader";
import WorkspaceNav from "@/app/components/workspaceNav";
import { UserContext } from "../../contexts/userContext";
import { ChatContext } from "@/app/contexts/chatContext";
import { useContext, useEffect, useState } from "react";
import { gql } from "../../../__generated__/gql";
import { useLazyQuery } from "@apollo/client";
import { Amplify } from "aws-amplify";
import outputs from "../../../../amplify_outputs.json";
import { fetchUserAttributes } from "aws-amplify/auth";
import { useDisclosure } from "@mantine/hooks";
import CreateChannelModal from "@/app/components/createChannelModal";
import ChannelRoom from "@/app/components/channelRoom";
import { channelType } from "@/app/contexts/chatContext";
import { ChannelType } from "@/__generated__/graphql";
import { GiMagnifyingGlass } from "react-icons/gi";

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
    users {
      fullName
      username
    }
    channels {
      id
      name
      type
      users {
        username
        fullName
      }
      messages {
        id
        text
        date
   
        user {
          username
          fullName
        }     
        threads {
          id
          text
          date
          user {
            username
            fullName
          }
        }
      }
    }
  }
}
  `);

Amplify.configure(outputs);
export default function CurrentWorkspace({ params }: Workspace) {
  const [getUserData] = useLazyQuery(USER_DATA);
  const [getCurrentWorkspace] = useLazyQuery(CURRENT_WORKSPACE);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [channelNav, setChannelNav] = useState<ChannelType>(ChannelType.Public);
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
  const {
    channels,
    setChannels,
    setWorkspaceId,
    setUsername: cc_setUsername,
  } = useContext(ChatContext);

  useEffect(() => {
    handleInitialLoad();
  }, []);

  return (
    <>
      <Stack
        w={"100vw"}
        h={"100vh"}
        mah={"100vh"}
        bg={"gray.0"}
        px={15}
        py={10}
      >
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
                wrap={"nowrap"}
              >
                <WorkspaceNav setChannelNav={setChannelNav} />
                <>
                  <Box
                    h={"100%"}
                    style={{
                      flexGrow: "1",

                      display:
                        channelNav == ChannelType.Public ? "block" : "none",
                    }}
                  >
                    <Tabs
                      defaultValue={
                        channels.filter((ch) => ch.type == ChannelType.Public)
                          .length != 0
                          ? channels.find((ch) => ch.type == ChannelType.Public)
                              ?.id
                          : ""
                      }
                      h={"100%"}
                      color="violet.8"
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
                            w={"20rem"}
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

                        {channels.filter((ch) => ch.type == ChannelType.Public)
                          .length != 0 ? (
                          channels
                            .filter((ch) => ch.type == ChannelType.Public)
                            .map((c) => {
                              // if (c.type == ChannelType.Public) {
                              return (
                                <TabsTab key={c.id} value={c.id}>
                                  {c.name}
                                </TabsTab>
                              );
                              // }
                            })
                        ) : (
                          <Stack
                            w={"20rem"}
                            // style={{ outline: "solid 2px orange" }}
                            align="center"
                            py={40}
                          >
                            <GiMagnifyingGlass
                              size={"10rem"}
                              color={DEFAULT_THEME.colors.violet[8]}
                            />
                            <Title
                              c={"violet.8"}
                              style={{ textAlign: "center" }}
                              order={2}
                              px={40}
                            >
                              You are not in any channel.
                            </Title>
                          </Stack>
                        )}
                      </TabsList>

                      {channels
                        .filter((ch) => ch.type == ChannelType.Public)
                        .map((c) => {
                          // if (c.type == ChannelType.Public) {
                          return (
                            <TabsPanel key={c.id} value={c.id}>
                              <ChannelRoom key={c.id} channelId={c.id} />
                            </TabsPanel>
                          );
                          // }
                        })}
                    </Tabs>
                  </Box>

                  <Box
                    h={"100%"}
                    style={{
                      flexGrow: "1",

                      display:
                        channelNav == ChannelType.Private ? "block" : "none",
                    }}
                  >
                    <Tabs
                      defaultValue={
                        channels.filter((ch) => ch.type == ChannelType.Private)
                          .length != 0
                          ? channels.find(
                              (ch) => ch.type == ChannelType.Private
                            )?.id
                          : ""
                      }
                      h={"100%"}
                      color="violet.8"
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
                            w={"20rem"}
                            size="lg"
                            variant="light"
                            color="gray"
                            leftSection={<MdAdd size={"2rem"} />}
                            onClick={createChannelOpen}
                          >
                            Create New Channel
                          </Button>
                        ) : null}

                        {channels.filter((ch) => ch.type == ChannelType.Private)
                          .length != 0 ? (
                          channels
                            .filter((ch) => ch.type == ChannelType.Private)
                            .map((c) => {
                              // if (c.type == ChannelType.Private) {
                              return (
                                <TabsTab key={c.id} value={c.id}>
                                  {c.name}
                                </TabsTab>
                              );
                              // }
                            })
                        ) : (
                          <Stack
                            w={"20rem"}
                            // style={{ outline: "solid 2px orange" }}
                            align="center"
                            py={40}
                          >
                            <GiMagnifyingGlass
                              size={"10rem"}
                              color={DEFAULT_THEME.colors.violet[8]}
                            />
                            <Title
                              c={"violet.8"}
                              style={{ textAlign: "center" }}
                              order={2}
                              px={40}
                            >
                              You are not in any channel.
                            </Title>
                          </Stack>
                        )}
                      </TabsList>

                      {channels
                        .filter((ch) => ch.type == ChannelType.Private)
                        .map((c) => {
                          // if (c.type == ChannelType.Private) {
                          return (
                            <TabsPanel key={c.id} value={c.id}>
                              <ChannelRoom key={c.id} channelId={c.id} />
                            </TabsPanel>
                          );
                          // }
                        })}
                    </Tabs>
                  </Box>
                </>
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
        title={
          channelNav == ChannelType.Public
            ? "Create Public Channel"
            : "Create Private Channel"
        }
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
        <CreateChannelModal
          channelType={channelNav}
          closeFunction={createChannelClose}
        />
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
          fetchPolicy: "network-only",
          variables: { username: preferred_username },
        });
        if (data) {
          const allWorkspaces = data.userByUsername.workspaces.map((w) => {
            return {
              id: w.id,
              name: w.name,
              createdBy: w.createdBy,
              users: [],
            };
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
              fetchPolicy: "network-only",
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
                users: currentWorkspaceData.workspaceByID.users,
                isAdmin: isAdmin,
              });

              const channels: channelType[] =
                currentWorkspaceData.workspaceByID.channels.map((c) => {
                  const newChannels = {
                    id: c.id,
                    name: c.name,
                    type: c.type,
                    users: c.users,
                    message: c.messages.map((m) => {
                      return {
                        text: m.text,
                        date: m.date,
                        id: m.id,
                        user: {
                          username: m.user.username,
                          fullName: m.user.fullName,
                        },
                        threads: m.threads.map((th) => {
                          return {
                            text: th.text,
                            date: th.date,
                            id: th.id,
                            user: {
                              username: th.user.username,
                              fullName: th.user.fullName,
                            },
                          };
                        }),
                      };
                    }),
                  };
                  return newChannels;
                });
              // currentWorkspaceData.workspaceByID.channels as channelType[]'
              console.log(
                "Current Workspace:",
                currentWorkspaceData.workspaceByID
              );

              console.log("Workspace Channels:", channels);

              setChannels(channels);
              cc_setUsername(preferred_username);
              setWorkspaceId(currentWorkspaceData.workspaceByID.id);
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
