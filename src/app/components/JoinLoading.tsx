import { Group, Stack, Skeleton } from "@mantine/core";

function JoinLoading() {
  return (
    <Stack h={"100vh"} bg={"violet.0"} px={20} py={10}>
      <Group>
        <Skeleton height={40} width={250} />
      </Group>
      <Stack pt={"4rem"} gap={"2rem"} h={"100%"} align="center">
        <Group>
          <Skeleton height={60} width={1000} />
        </Group>
        <Group wrap={"nowrap"} gap={0} align="center" justify="center">
          <Skeleton height={80} width={500} />
        </Group>
        <Stack>
          <Skeleton height={60} width={250} />
          <Skeleton height={60} width={250} />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default JoinLoading;
