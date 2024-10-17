import {
  Stack,
  Title,
  Button,
  Group,
  Avatar,
  DEFAULT_THEME,
} from "@mantine/core";
import { BsChat } from "react-icons/bs";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";

type ChatInviteProps = {
  fullName: string;
};
function ChatInvite({ fullName }: ChatInviteProps) {
  return (
    <Stack w={"100%"} h={"100%"} justify="center" align="center" gap={40}>
      {/* <Group gap={10}>
    
      </Group> */}
      <Stack align="center" gap={2}>
        <Title fz={"2.5rem"}>Start a conversation with</Title>
        <Title c={"violet.8"}>{fullName}</Title>
      </Stack>

      <Button
        size="xl"
        bg={"violet.8"}
        leftSection={<HiOutlineChatBubbleLeftRight size={"1.8rem"} />}
      >
        Chat Now
      </Button>
    </Stack>
  );
}

export default ChatInvite;
