"use client";
import { Amplify } from "aws-amplify";
import outputs from "../../../../amplify_outputs.json";
import {
  Avatar,
  Button,
  Group,
  Stack,
  Title,
  DEFAULT_THEME,
} from "@mantine/core";
import { MdAdd } from "react-icons/md";
import { useQuery, useMutation } from "@apollo/client";
import { gql } from "@/__generated__/gql";
import { fetchUserAttributes } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import JoinLoading from "@/app/components/JoinLoading";

const GET_WORKSPACE_DATA = gql(`
    query WorkspaceByIDJoin($workspaceId: UUID!, $username: String!) {
  workspaceByID(workspaceID: $workspaceId, username: $username) {
    name
    users {
      fullName
      username
    }
  }
}
    `);

const ADD_USER_TO_WORKSPACE = gql(`
    mutation AddUserToWorkspaceJoin($input: AddUserToWorkspaceInput!) {
  addUserToWorkspace(input: $input) {
    workspace {
      id
    }
  }
}
    `);

type JoinProps = {
  params: { workspaceID: string };
};
Amplify.configure(outputs);
function Join({ params }: JoinProps) {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_WORKSPACE_DATA, {
    variables: { workspaceId: params.workspaceID, username: "" },
  });
  const [addUserToWorkspace] = useMutation(ADD_USER_TO_WORKSPACE);
  const [joinLoading, setJoinLoading] = useState(false);
  const [noJoinLoading, setNoJoinLoading] = useState(false);

  if (loading) return <JoinLoading />;
  if (error) return <>{error.message}</>;
  return (
    <Stack h={"100vh"} bg={"violet.0"} px={20} py={10}>
      <Group>
        <Title c={"violet.8"}>Chatspy</Title>
      </Group>
      <Stack pt={"4rem"} gap={"2rem"} h={"100%"} align="center">
        <Group gap={16}>
          <Title fz={"3rem"}>Join the</Title>
          <Title fz={"3rem"} c={"violet.8"}>
            {data?.workspaceByID.name}
          </Title>
          <Title fz={"3rem"}>workspace!</Title>
        </Group>
        <Group wrap={"nowrap"} gap={0}>
          <Avatar.Group spacing={"md"}>
            {data?.workspaceByID &&
              data.workspaceByID.users
                .filter((u, index) => index < 3)
                .map((u) => {
                  return (
                    <Avatar
                      key={u.username}
                      name={u.fullName}
                      size={"xl"}
                      color={"#fff"}
                      styles={{
                        root: { borderColor: DEFAULT_THEME.colors.violet[8] },
                        placeholder: { color: DEFAULT_THEME.colors.violet[8] },
                      }}
                    />
                  );
                })}

            {data && data.workspaceByID.users.length > 3 ? (
              <Avatar
                size={"xl"}
                color={"#fff"}
                styles={{
                  root: { borderColor: DEFAULT_THEME.colors.violet[8] },
                  placeholder: { color: DEFAULT_THEME.colors.violet[8] },
                }}
              >
                +{data.workspaceByID.users.length - 3}
              </Avatar>
            ) : null}
          </Avatar.Group>
        </Group>
        <Button
          loading={joinLoading}
          size="xl"
          color="violet.8"
          leftSection={<MdAdd size={"2rem"} />}
          onClick={handleJoinWorkspace}
        >
          Join workspace
        </Button>
        <Button
          loading={noJoinLoading}
          size="xl"
          color="violet.8"
          variant={"transparent"}
          onClick={handleNoJoinWorkspace}
        >
          Don't want to join
        </Button>
      </Stack>
    </Stack>
  );

  async function handleJoinWorkspace() {
    try {
      setJoinLoading(true);
      const { email } = await fetchUserAttributes();
      if (email) {
        await addUserToWorkspace({
          variables: {
            input: { workspaceID: params.workspaceID, email: email },
          },
        });
        router.push(`/workspace/${params.workspaceID}`);
      }
    } catch (error) {
      sessionStorage.setItem("workspaceToJoin", params.workspaceID);
      router.push("/login");
    }
  }

  async function handleNoJoinWorkspace() {
    setNoJoinLoading(true);
    try {
      const { preferred_username } = await fetchUserAttributes();
      if (preferred_username) {
        const lastVisitedWorkspace = localStorage.getItem(
          "lastVisitedWorkspace"
        );

        if (lastVisitedWorkspace) {
          router.push(`/workspace/${lastVisitedWorkspace}`);
        } else router.push("/workspace");
      }
    } catch (error) {
      router.push("/login");
    }
  }
}

export default Join;
