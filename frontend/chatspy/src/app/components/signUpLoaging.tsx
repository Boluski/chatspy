import { Paper, Skeleton, Stack } from "@mantine/core";

function SignUpLoading() {
  return (
    <Paper shadow="xl" radius={"0.5rem"}>
      <Stack
        style={{ borderRadius: "0.5rem" }}
        w={"35rem"}
        bg={"gray.0"}
        p={"lg"}
      >
        <Skeleton height={40} width={175} mb={10}></Skeleton>

        <Skeleton height={50}></Skeleton>

        <Skeleton height={50}></Skeleton>

        <Skeleton height={50}></Skeleton>

        <Skeleton height={50}></Skeleton>

        <Skeleton height={35} mt={10}></Skeleton>

        <Skeleton height={20}></Skeleton>
      </Stack>
    </Paper>
  );
}

export default SignUpLoading;
