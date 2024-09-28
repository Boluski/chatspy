"use client";

import { createContext, useEffect, useState } from "react";
import { fetchUserAttributes } from "aws-amplify/auth";
import { gql } from "../../__generated__/gql";
import { useLazyQuery } from "@apollo/client";
import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";

type userProviderProps = {
  children: React.ReactNode;
};

type valueType = {
  username: string;
  email: string;
  fullName: string;
  isAuthenticated: boolean;
  isAuthorized: (workspaceID: string) => boolean;
  loading: boolean;
};

type workspaceType = {
  id: string;
  name: string;
  createdBy: string;
};

const USER_DATA = gql(`
    query UserData($username: String!) {
  userByUsername(username: $username) {
    username
    fullName
    email
    workspaces {
      id
      name
      createdBy
    }
  }
}
    `);
const defaultValues = {
  username: "",
  email: "",
  fullName: "",
  isAuthenticated: false,
  isAuthorized: (workspaceID: string) => false,
  loading: true,
};

export const UserContext = createContext<valueType>(defaultValues);

Amplify.configure(outputs);
export const UserProvider = ({ children }: userProviderProps) => {
  useEffect(() => {
    handleInitialLoad();
  }, []);
  const [loading, setLoading] = useState(true);
  const [getUserData] = useLazyQuery(USER_DATA);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [userWorkspaces, setUserWorkspaces] = useState<workspaceType[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [currentWorkspace, setCurrentWorkspace] = useState<workspaceType>();

  const values = {
    username,
    email,
    fullName,
    isAuthenticated,
    isAuthorized,
    loading,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;

  async function handleInitialLoad() {
    try {
      const { preferred_username } = await fetchUserAttributes();

      // If user is authenticated
      if (preferred_username) {
        setIsAuthenticated(true);
        setUsername(preferred_username);
        const { data } = await getUserData({
          variables: { username: preferred_username },
        });
        if (data) {
          setEmail(data.userByUsername.email);
          setFullName(data.userByUsername.fullName);
          setUserWorkspaces(
            data.userByUsername.workspaces.map((w) => {
              return { id: w.id, name: w.name, createdBy: w.createdBy };
            })
          );
        }
      }
    } catch (error) {}

    setLoading(false);
  }

  function isAuthorized(workspaceID: string) {
    const workspaceIndex = userWorkspaces.findIndex((w) => w.id == workspaceID);
    if (workspaceIndex != -1) {
      // Get target workspace data here

      return true;
    } else {
      return false;
    }
  }
};
