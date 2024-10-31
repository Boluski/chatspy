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
    </Stack>
  );
}

export default WorkspaceLoading;
