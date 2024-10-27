import { Stack, Group, SimpleGrid, Skeleton } from "@mantine/core";

export default function WorkspacesLoading() {
  return (
    <Stack w={"100%"} h={"100vh"} bg={"gray.0"} px={15} py={10} gap={20}>
      <Group w={"100%"} justify={"space-between"}>
        <Group gap={5}>
          <Skeleton height={40} width={250} />
          <Skeleton height={40} width={400} />
        </Group>

        <Skeleton height={60} radius={"xl"} circle />
      </Group>
      <Group justify={"space-between"} wrap={"nowrap"} px={15}>
        <Skeleton height={40} width={350} />
        <Skeleton style={{ flexGrow: "1" }} height={40} />
        <Skeleton height={40} width={300} />
      </Group>

      <SimpleGrid cols={3} px={15}>
        <Skeleton height={150} />
        <Skeleton height={150} />
        <Skeleton height={150} />
        <Skeleton height={150} />
        <Skeleton height={150} />
        <Skeleton height={150} />
      </SimpleGrid>
    </Stack>
  );
}
