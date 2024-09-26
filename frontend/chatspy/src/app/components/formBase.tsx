import { Box, Group, Center, Title, Text, Stack } from "@mantine/core";

type FormBaseProps = {
  title: string;
  message: string;
  children: React.ReactNode;
};

export default function FormBase({ title, message, children }: FormBaseProps) {
  return (
    <Group h={"100vh"} bg={"violet.1"} gap={0}>
      <Stack
        w={"50%"}
        h={"100%"}
        bg={"violet.8"}
        justify="center"
        align="center"
      >
        <Title c={"gray.0"} size={"4rem"}>
          {title}
        </Title>
        <Text c={"gray.0"} size={"2rem"}>
          {message}
        </Text>
      </Stack>
      <Center h={"100%"} w={"50%"}>
        {children}
      </Center>
    </Group>
  );
}
