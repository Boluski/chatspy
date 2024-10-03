import { Group, Title, DEFAULT_THEME } from "@mantine/core";

type ChannelRoomHeadProps = {
  channelId: string;
  channelName: string;
};

function ChannelRoomHead({ channelName }: ChannelRoomHeadProps) {
  return (
    <Group
      p={5}
      style={{
        borderBottom: `2px solid ${DEFAULT_THEME.colors.dark[0]}`,
      }}
    >
      <Title order={1} c={"dark.5"}>
        {channelName}
      </Title>
    </Group>
  );
}

export default ChannelRoomHead;
