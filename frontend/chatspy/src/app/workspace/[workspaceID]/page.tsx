"use client";
import {
  Stack,
  Avatar,
  Title,
  Button,
  Group,
  TextInput,
  DEFAULT_THEME,
  ActionIcon,
  Tabs,
  TabsList,
  TabsTab,
  TabsPanel,
} from "@mantine/core";
import { IoSearchSharp } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa6";
import { IoLockClosed } from "react-icons/io5";
import { IoPersonSharp } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import WorkspaceHeader from "@/app/components/workspaceHeader";
import WorkspaceNav from "@/app/components/workspaceNav";
import { UserContext } from "../../contexts/userContext";
import { useContext } from "react";

type Workspace = {
  params: { workspaceID: string };
};

export default function Workspace({ params }: Workspace) {
  const { username, email, fullName, isAuthenticated, isAuthorized, loading } =
    useContext(UserContext);

  return (
    <Stack w={"100wh"} h={"100vh"} bg={"gray.0"} px={15} py={10}>
      {loading ? (
        <>loading</>
      ) : isAuthenticated ? (
        isAuthorized(params.workspaceID) ? (
          <>
            <WorkspaceHeader />
            <Group w={"100%"} style={{ flexGrow: "1" }} align={"start"} gap={0}>
              <WorkspaceNav />
              <Tabs
                style={{ flexGrow: "1" }}
                h={"100%"}
                color="violet.8"
                defaultValue="gallery"
                orientation="vertical"
                variant="pills"
                radius={0}
                styles={{
                  list: {
                    borderRight: `solid 2px ${DEFAULT_THEME.colors.dark[0]}`,
                  },
                  tab: {
                    maxWidth: "20rem",
                  },
                  tabLabel: { fontSize: "1.5rem" },
                }}
              >
                <TabsList>
                  <Button
                    my={0}
                    size="lg"
                    variant="light"
                    color="gray"
                    leftSection={<MdAdd size={"2rem"} />}
                  >
                    Create New Channel
                  </Button>
                  <TabsTab value="general">General</TabsTab>
                  <TabsTab value="announcements">Announcements</TabsTab>
                  <TabsTab value="welcome">Welcome</TabsTab>
                </TabsList>

                <TabsPanel value="general">General</TabsPanel>
                <TabsPanel value="announcements">Announcements</TabsPanel>
                <TabsPanel value="welcome">Welcome</TabsPanel>
              </Tabs>
            </Group>
          </>
        ) : (
          <>Not Authorized</>
        )
      ) : (
        <>Not Authenticated</>
      )}
    </Stack>
  );
}
