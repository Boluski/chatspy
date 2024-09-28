"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { fetchUserAttributes } from "aws-amplify/auth";
import { gql } from "../../__generated__/gql";
import { useLazyQuery } from "@apollo/client";
import { Amplify } from "aws-amplify";
import outputs from "../../../amplify_outputs.json";
import { workerData } from "worker_threads";

type userProviderProps = {
  children: React.ReactNode;
};

type valueType = {
  username: string;
  email: string;
  fullName: string;
  isAuthenticated: boolean;
  userWorkspaces: workspaceType[];
  currentWorkspace: workspaceType | null;
  setUsername: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setFullName: Dispatch<SetStateAction<string>>;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  setUserWorkspaces: Dispatch<SetStateAction<workspaceType[]>>;
  setCurrentWorkspace: Dispatch<SetStateAction<workspaceType | null>>;
};

type workspaceType = {
  id: string;
  name: string;
  createdBy: string;
  isAdmin?: boolean;
};

const defaultValues = {
  username: "",
  email: "",
  fullName: "",
  isAuthenticated: false,
  userWorkspaces: [],
  currentWorkspace: null,
  setIsAuthenticated: () => false,
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [currentWorkspace, setCurrentWorkspace] =
    useState<workspaceType | null>(null);

  const values = {
    username,
    email,
    fullName,
    isAuthenticated,
    userWorkspaces,
    currentWorkspace,
    setIsAuthenticated,
    setUsername,
    setFullName,
    setEmail,
    setUserWorkspaces,
    setCurrentWorkspace,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
