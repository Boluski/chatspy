"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";

import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";

type userProviderProps = {
  children: React.ReactNode;
};

type valueType = {
  username: string;
  email: string;
  fullName: string;
  userWorkspaces: workspaceType[];
  currentWorkspace: workspaceType | null;
  setUsername: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setFullName: Dispatch<SetStateAction<string>>;
  setUserWorkspaces: Dispatch<SetStateAction<workspaceType[]>>;
  setCurrentWorkspace: Dispatch<SetStateAction<workspaceType | null>>;
};

export type userType = {
  fullName: string;
  username: string;
};

export type workspaceType = {
  id: string;
  name: string;
  createdBy: string;
  users: userType[];
  isAdmin?: boolean;
};

const defaultValues = {
  username: "",
  email: "",
  fullName: "",
  userWorkspaces: [],
  currentWorkspace: null,
  setEmail: () => "",
  setUsername: () => "",
  setFullName: () => "",
  setUserWorkspaces: () => [],
  setCurrentWorkspace: () => null,
} as valueType;

export const UserContext = createContext<valueType>(defaultValues);

Amplify.configure(outputs);
export const UserProvider = ({ children }: userProviderProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [userWorkspaces, setUserWorkspaces] = useState<workspaceType[]>([]);
  const [currentWorkspace, setCurrentWorkspace] =
    useState<workspaceType | null>(null);

  const values = {
    username,
    email,
    fullName,
    userWorkspaces,
    currentWorkspace,
    setUsername,
    setFullName,
    setEmail,
    setUserWorkspaces,
    setCurrentWorkspace,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
