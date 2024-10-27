import { Box, DEFAULT_THEME, Group, Skeleton, Stack } from "@mantine/core";

function WorkspaceLoading() {
  return (
    <Stack w={"100vw"} h={"100vh"} mah={"100vh"} bg={"gray.0"} px={15} gap={0}>
      <Group
        align={"center"}
        wrap={"nowrap"}
        p={5}
        style={{ borderBottom: `solid 2px ${DEFAULT_THEME.colors.dark[0]}` }}
      >
        <Skeleton height={50} width={60} />
        <Skeleton height={35} width={250} />
        <Box style={{ flexGrow: 1 }}>
          <Skeleton height={50} />
        </Box>
        <Skeleton height={60} circle />
      </Group>
      <Group h={"100%"} gap={5} wrap={"nowrap"}>
        <Stack
          w={"fit-content"}
          h={"100%"}
          justify={"space-between"}
          pr={"sm"}
          py={10}
        >
          <Stack>
            <Stack align="center" gap={"0.5rem"}>
              <Skeleton height={70} width={70} />
              <Skeleton height={15} width={45} />
            </Stack>

            <Stack align="center" gap={"0.5rem"}>
              <Skeleton height={70} width={70} />
              <Skeleton height={15} width={45} />
            </Stack>
            <Stack align="center" gap={"0.5rem"}>
              <Skeleton height={70} width={70} />
              <Skeleton height={15} width={45} />
            </Stack>
          </Stack>
          <Stack>
            <Stack align="center" gap={"0.5rem"}>
              <Skeleton height={70} width={70} />
              <Skeleton height={15} width={45} />
            </Stack>
            <Stack align="center" gap={"0.5rem"}>
              <Skeleton height={70} width={70} />
              <Skeleton height={15} width={45} />
            </Stack>
          </Stack>
        </Stack>

        <Stack
          h={"100%"}
          w={"20rem"}
          style={{
            borderRight: `solid 2px ${DEFAULT_THEME.colors.dark[0]}`,
            borderLeft: `solid 2px ${DEFAULT_THEME.colors.dark[0]}`,
          }}
        >
          <Skeleton height={70} width={"100%"} />
          <Stack gap={5}>
            <Skeleton height={50} width={"100%"} />
            <Skeleton height={50} width={"100%"} />
            <Skeleton height={50} width={"100%"} />
          </Stack>
        </Stack>

        <Stack h={"100%"} style={{ flexGrow: 1 }} pb={10}>
          <Group
            py={10}
            px={20}
            justify={"space-between"}
            align="center"
            style={{
              borderBottom: `solid 2px ${DEFAULT_THEME.colors.dark[0]}`,
            }}
          >
            <Group wrap={"nowrap"}>
              <Skeleton height={40} width={40} />
              <Skeleton height={25} width={150} />
            </Group>
            <Group wrap={"nowrap"} align="center">
              <Skeleton height={40} width={40} />
            </Group>
          </Group>

          <Stack h={"100%"} gap={5} justify={"end"} px={20}>
            <Group wrap={"nowrap"} align={"start"} py={10}>
              <Skeleton height={65} circle />
              <Stack style={{ flexGrow: 1 }}>
                <Skeleton height={30} width={100} />
                <Skeleton height={10} width={"100%"} />
                <Skeleton height={10} width={"100%"} />
                <Skeleton height={10} width={"150"} />
                <Group justify="end">
                  <Skeleton height={10} width={"150"} />
                </Group>
              </Stack>
            </Group>
            <Group wrap={"nowrap"} align={"start"} py={10}>
              <Skeleton height={65} circle />
              <Stack style={{ flexGrow: 1 }}>
                <Skeleton height={30} width={100} />
                <Skeleton height={10} width={"100%"} />
                <Skeleton height={10} width={"100%"} />
                <Skeleton height={10} width={"150"} />
                <Group justify="end">
                  <Skeleton height={10} width={"150"} />
                </Group>
              </Stack>
            </Group>
            <Skeleton height={100} width={"100%"} />
          </Stack>
        </Stack>
      </Group>

      {/* <Group
        w={"100%"}
        h={`calc(${screenSize} - ${workspaceHeaderSize})`}
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
                    h={"3.8rem"}
                    my={0}
                    size="xl"
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
                        <TabsTab
                          key={c.id}
                          value={c.id}
                          onClick={() => {
                            setOnTabClicked((count) => {
                              return count + 1;
                            });
                          }}
                        >
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
                  return (
                    <TabsPanel key={c.id} value={c.id}>
                      <ChannelRoom
                        onTabClicked={onTabClicked}
                        key={c.id}
                        channelId={c.id}
                      />
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
                channelNav == ChannelType.Private ? "block" : "none",
            }}
          >
            <Tabs
              defaultValue={
                channels.filter((ch) => ch.type == ChannelType.Private)
                  .length != 0
                  ? channels.find((ch) => ch.type == ChannelType.Private)
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
                    my={0}
                    w={"20rem"}
                    h={"3.8rem"}
                    size="xl"
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
                        <TabsTab
                          onClick={() => {
                            setOnTabClicked((count) => {
                              return count + 1;
                            });
                          }}
                          key={c.id}
                          value={c.id}
                        >
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
                      <ChannelRoom
                        onTabClicked={onTabClicked}
                        key={c.id}
                        channelId={c.id}
                      />
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
                        <TabsTab
                          onClick={() => {
                            setOnTabClicked((count) => {
                              return count + 1;
                            });
                          }}
                          key={u.username}
                          value={u.username}
                        >
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
                          <TabsPanel key={u.username} value={u.username}>
                            <ChannelRoom
                              onTabClicked={onTabClicked}
                              key={channelLink.channelId}
                              channelId={channelLink.channelId}
                            />
                          </TabsPanel>
                        );
                      } else {
                        return (
                          <TabsPanel key={u.username} value={u.username}>
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
      </Group> */}
    </Stack>
  );
}

export default WorkspaceLoading;
