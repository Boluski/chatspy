import {
  Stack,
  Group,
  Avatar,
  Title,
  Text,
  Box,
  DEFAULT_THEME,
} from "@mantine/core";

type MessageBoxProps = {
  isUser: boolean;
  messageId: string;
};

function MessageBox({ isUser, messageId }: MessageBoxProps) {
  const currentDate = new Date();
  return (
    <Group wrap={"nowrap"} align={"start"} bg={isUser ? "violet.0" : ""} p={5}>
      <Avatar
        size={"lg"}
        name="Boluwatife Ajibola"
        styles={
          isUser
            ? {
                root: { border: `2px solid ${DEFAULT_THEME.colors.violet[8]}` },
                placeholder: { color: DEFAULT_THEME.colors.violet[8] },
              }
            : {
                root: { border: `` },
                placeholder: { color: "" },
              }
        }
      />
      <Stack gap={5}>
        <Title order={3}>Boluwatife Ajibola</Title>
        <Text>
          By default, all colors from the default theme are allowed for By
          default, all colors from the default theme are allowed for default,
          initials, you can restrict them by providing allowedInitialsColors
          prop with an array of colors. Note that the default colors array does
          not include custom colors defined in the theme, you need to provide
          them manually if needed.
        </Text>
        <Title c={"gray.5"} style={{ textAlign: "end" }} order={6}>
          {currentDate.toDateString()} - {currentDate.toLocaleTimeString()}
        </Title>
      </Stack>
    </Group>
  );
}

export default MessageBox;
