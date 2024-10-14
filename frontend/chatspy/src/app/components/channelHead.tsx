import { Group, Title, DEFAULT_THEME, ActionIcon } from "@mantine/core";
import { AiOutlineUserAdd } from "react-icons/ai";
import { VscSettings } from "react-icons/vsc";
type ChannelRoomHeadProps = {
  channelId: string;
  channelName: string;
  showControls: boolean;
  isPrivate: boolean;
  openAddUserFunction: () => void;
};

function ChannelRoomHead({
  channelName,
  showControls,
  isPrivate,
  openAddUserFunction,
}: ChannelRoomHeadProps) {
  return (
    <>
      <Group
        p={5}
        justify={"space-between"}
        align="center"
        style={{
          borderBottom: `2px solid ${DEFAULT_THEME.colors.dark[0]}`,
        }}
      >
        <Title order={1} c={"dark.5"}>
          {channelName}
        </Title>
        {showControls ? (
          <Group>
            {isPrivate && (
              <ActionIcon
                color="dark.5"
                variant={"transparent"}
                size={"lg"}
                onClick={() => {
                  openAddUserFunction();
                }}
              >
                <AiOutlineUserAdd size={"2rem"} />
              </ActionIcon>
            )}

            <ActionIcon color="dark.5" variant={"transparent"} size={"lg"}>
              <VscSettings size={"2rem"} />
            </ActionIcon>
          </Group>
        ) : null}
      </Group>
    </>
  );
}

export default ChannelRoomHead;
