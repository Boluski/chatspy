import { Group, Title, DEFAULT_THEME, ActionIcon } from "@mantine/core";
import { AiOutlineUserAdd } from "react-icons/ai";
import { VscSettings } from "react-icons/vsc";
import { userType } from "../contexts/userContext";
import { FaUserAlt } from "react-icons/fa";
import { IoLockClosed } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa6";

type ChannelRoomHeadProps = {
  channelName: string;
  showControls: boolean;
  isPrivate: boolean;
  openAddUserFunction: () => void;
  openChannelSettingsFunction: () => void;
  isDirect: boolean;
  dmUsers?: userType[];
  username: string;
};

function ChannelRoomHead({
  channelName,
  showControls,
  isPrivate,
  openAddUserFunction,
  openChannelSettingsFunction,
  isDirect,
  dmUsers,
  username,
}: ChannelRoomHeadProps) {
  return (
    <>
      <Group
        px={20}
        h={"3.8rem"}
        justify={"space-between"}
        align="center"
        style={{
          borderBottom: `2px solid ${DEFAULT_THEME.colors.dark[0]}`,
        }}
        bg={"gray.0"}
      >
        <Group>
          {isDirect ? (
            <FaUserAlt
              color={`${DEFAULT_THEME.colors.violet[8]}`}
              size={"2rem"}
            />
          ) : null}

          {isPrivate ? (
            <IoLockClosed
              color={`${DEFAULT_THEME.colors.violet[8]}`}
              size={"2rem"}
            />
          ) : null}

          {isPrivate == false && isDirect == false ? (
            <FaHashtag
              color={`${DEFAULT_THEME.colors.violet[8]}`}
              size={"2rem"}
            />
          ) : null}

          <Title order={1} c={"dark.5"}>
            {isDirect
              ? dmUsers?.filter((u) => u.username != username)[0].fullName
              : channelName}
          </Title>
        </Group>

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

            <ActionIcon
              color="dark.5"
              variant={"transparent"}
              size={"lg"}
              onClick={() => {
                openChannelSettingsFunction();
              }}
            >
              <VscSettings size={"2rem"} />
            </ActionIcon>
          </Group>
        ) : null}
      </Group>
    </>
  );
}

export default ChannelRoomHead;
