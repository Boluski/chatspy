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
  Drawer,
  ScrollArea,
} from "@mantine/core";
import { MdAdd } from "react-icons/md";
import WorkspaceHeader from "@/app/components/workspaceHeader";
import WorkspaceNav from "@/app/components/workspaceNav";
import { UserContext } from "../../contexts/userContext";
import {
  ChatContext,
  usernameChannelMapType,
} from "@/app/contexts/chatContext";
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
import ChatInvite from "@/app/components/chatInvite";
import { useRouter } from "next/navigation";

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
  const [
    workspaceDrawOpened,
    { open: workspaceDrawOpen, close: workspaceDrawClose },
  ] = useDisclosure(false);
  const {
    isAuthenticated,
    currentWorkspace,
    userWorkspaces,
    username,
    fullName,
    setIsAuthenticated,
    setEmail,
    setUsername,
    setFullName,
    setUserWorkspaces,
    setCurrentWorkspace,
  } = useContext(UserContext);
  const {
    channels,
    usernameDmChannels,
    setChannels,
    setWorkspaceId,
    setUsernameDmChannels,
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
              <WorkspaceHeader workspaceDrawOpen={workspaceDrawOpen} />
              <Group
                w={"100%"}
                style={{ flexGrow: "1" }}
                align={"start"}
                gap={0}
                wrap={"nowrap"}
              >
                <WorkspaceNav
                  workspaceId={currentWorkspace ? currentWorkspace?.id : ""}
                  setChannelNav={setChannelNav}
                />
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
                          <Stack w={"20rem"} align="center" py={40}>
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
                          return (
                            <TabsPanel key={c.id} value={c.id}>
                              <ChannelRoom key={c.id} channelId={c.id} />
                            </TabsPanel>
                          );
                        })}
                    </Tabs>
                  </Box>

                  <Box
                    h={"100%"}
                    style={{
                      flexGrow: "1",

                      display:
                        channelNav == ChannelType.Direct ? "block" : "none",
                    }}
                  >
                    <Tabs
                      defaultValue={
                        currentWorkspace
                          ? currentWorkspace.users.filter(
                              (u) => u.username != username
                            ).length != 0
                            ? currentWorkspace.users.filter(
                                (u) => u.username != username
                              )[0].username
                            : ""
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
                        {currentWorkspace?.users.filter(
                          (u) => u.username != username
                        ).length != 0 ? (
                          currentWorkspace?.users
                            .filter((u) => u.username != username)
                            .map((u) => {
                              return (
                                <TabsTab key={u.username} value={u.username}>
                                  {u.fullName}
                                </TabsTab>
                              );
                            })
                        ) : (
                          <Stack w={"20rem"} align="center" py={40}>
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
                              No member as been added to this workspace.
                            </Title>
                          </Stack>
                        )}
                      </TabsList>

                      {currentWorkspace?.users.filter(
                        (u) => u.username != username
                      ).length != 0
                        ? currentWorkspace?.users
                            .filter((u) => u.username != username)
                            .map((u) => {
                              const channelLink = usernameDmChannels.find(
                                (uc) => uc.username == u.username
                              );
                              if (channelLink) {
                                return (
                                  <TabsPanel
                                    key={u.username}
                                    value={u.username}
                                  >
                                    <ChannelRoom
                                      key={channelLink.channelId}
                                      channelId={channelLink.channelId}
                                    />
                                  </TabsPanel>
                                );
                              } else {
                                return (
                                  <TabsPanel
                                    key={u.username}
                                    value={u.username}
                                  >
                                    <ChatInvite
                                      username={username}
                                      fullName={fullName}
                                      inviteFullName={u.fullName}
                                      inviteUsername={u.username}
                                      workspaceId={currentWorkspace.id}
                                    />
                                  </TabsPanel>
                                );
                              }
                            })
                        : ""}
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
      <Drawer
        size={"sm"}
        overlayProps={{
          backgroundOpacity: 0.4,
          blur: 4,
        }}
        onClose={workspaceDrawClose}
        opened={workspaceDrawOpened}
        withCloseButton={false}
      >
        <Stack h={"100vh"}>
          <Title c={"violet.8"} ta={"center"}>
            Chatspy
          </Title>
          <Title order={2}>Workspaces</Title>
          <ScrollArea h={"100%"} type="never">
            <Stack>
              {currentWorkspace &&
                userWorkspaces
                  .filter((w) => w.id != currentWorkspace.id)
                  .map((w) => {
                    return (
                      <DrawerWorkspaceCard
                        key={w.id}
                        workspaceId={w.id}
                        workspaceName={w.name}
                      />
                    );
                  })}
            </Stack>
          </ScrollArea>
        </Stack>
      </Drawer>
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

              const dmChannels =
                currentWorkspaceData.workspaceByID.channels.filter(
                  (ch) => ch.type == ChannelType.Direct
                );
              const usernameChannels = dmChannels
                .filter((ch) => ch.users.length != 1)
                .map((ch) => {
                  console.log("ch", ch);

                  const dmUser = ch.users.filter(
                    (u) => u.username != preferred_username
                  );
                  return {
                    username: dmUser[0].username,
                    channelId: ch.id,
                  } as usernameChannelMapType;
                });

              console.log(
                "Current Workspace:",
                currentWorkspaceData.workspaceByID
              );

              console.log("Workspace Channels:", channels);

              console.log("username to channel:", usernameChannels);

              setChannels(channels);
              setUsernameDmChannels(usernameChannels);
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

type DrawerWorkspaceCardProps = {
  workspaceName: string;
  workspaceId: string;
};
function DrawerWorkspaceCard({
  workspaceId,
  workspaceName,
}: DrawerWorkspaceCardProps) {
  const router = useRouter();
  return (
    <Group
      style={{
        border: `solid ${DEFAULT_THEME.colors.dark[0]} 2px`,
        borderRadius: "0.5rem",
      }}
      p={10}
      bg={"gray.1"}
    >
      <Title style={{ flexGrow: 1 }} order={3}>
        {workspaceName}
      </Title>
      <Button
        size="md"
        color={"gray"}
        variant="light"
        onClick={() => router.push(`/workspace/${workspaceId}`)}
      >
        Open
      </Button>
    </Group>
  );
}
