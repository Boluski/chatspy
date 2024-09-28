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
  setUsername: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  fullName: string;
  setFullName: Dispatch<SetStateAction<string>>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  //   isAuthorized: (workspaceID: string) => Promise<boolean>;
  //   loading: boolean;
  userWorkspaces: workspaceType[];
  setUserWorkspaces: Dispatch<SetStateAction<workspaceType[]>>;
  //   setWorkspaceID: Dispatch<SetStateAction<string | null>>;
  //   isAuthorized: boolean;
};

type workspaceType = {
  id: string;
  name: string;
  createdBy: string;
};

// const USER_DATA = gql(`
//     query UserData($username: String!) {
//   userByUsername(username: $username) {
//     username
//     fullName
//     email
//     workspaces {
//       id
//       name
//       createdBy
//     }
//   }
// }
//     `);

// const CURRENT_WORKSPACE = gql(`
// query WorkspaceByID($workspaceId: UUID!, $username: String!) {
//   workspaceByID(workspaceID: $workspaceId, username: $username) {
//     id
//     name
//     createdBy
//   }
// }
//     `);

const defaultValues = {
  username: "",
  email: "",
  fullName: "",
  isAuthenticated: false,
  //   isAuthorized: async (workspaceID: string): Promise<boolean> => {
  //     return false;
  //   //   },
  //   loading: true,
  userWorkspaces: [],
  setIsAuthenticated: () => false,
  setEmail: () => "",
  setUsername: () => "",
  setFullName: () => "",
  //   setWorkspaceID: () => null,
  //   isAuthorized: false,
  setUserWorkspaces: () => [],
} as valueType;

export const UserContext = createContext<valueType>(defaultValues);

Amplify.configure(outputs);
export const UserProvider = ({ children }: userProviderProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [userWorkspaces, setUserWorkspaces] = useState<workspaceType[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const values = {
    username,
    email,
    fullName,
    isAuthenticated,
    userWorkspaces,
    setIsAuthenticated,
    setUsername,
    setFullName,
    setEmail,
    setUserWorkspaces,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;

  //   async function handleInitialLoad() {
  //     try {
  //       const { preferred_username } = await fetchUserAttributes();

  //       // If user is authenticated
  //       if (preferred_username) {
  //         console.log("auth");

  //         setIsAuthenticated(true);
  //         // console.log(isAuthenticated);

  //         setUsername(preferred_username);
  //         const { data } = await getUserData({
  //           variables: { username: preferred_username },
  //         });
  //         if (data) {
  //           setEmail(data.userByUsername.email);
  //           setFullName(data.userByUsername.fullName);
  //           //   console.log(data.userByUsername.workspaces);

  //           //   console.log(
  //           //     data.userByUsername.workspaces.map((w) => {
  //           //       return { id: w.id, name: w.name, createdBy: w.createdBy };
  //           //     })
  //           //   );

  //           setUserWorkspaces(
  //             data.userByUsername.workspaces.map((w) => {
  //               return { id: w.id, name: w.name, createdBy: w.createdBy };
  //             })
  //           );
  //         }
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }

  //     // setLoading(false);
  //   }

  //   async function handleIsAuthorized(workspaceID: string) {
  //     const workspaceIndex = userWorkspaces.findIndex(
  //       (w) => w.id == workspaceID
  //     );
  //     console.log(userWorkspaces);

  //     if (workspaceIndex != -1) {
  //       // Get target workspace data here
  //       //   await getCurrentWorkspace({
  //       //     variables: { workspaceId: workspaceID, username: username },
  //       //   });

  //       console.log("somthing yes");
  //       setIsAuthorized(true);
  //     } else {
  //       setIsAuthorized(false);
  //       console.log("somthing tre");
  //     }
  //   }

  //   async function handleWorkspaceChanged(workspaceID: string | null) {
  //     if (workspaceID != null) {
  //       //   await handleIsAuthorized(workspaceID);
  //       console.log("somthing else");
  //     }
  //   }
};
