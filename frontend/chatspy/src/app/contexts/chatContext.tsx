"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";

type ChatProviderProps = {
  children: React.ReactNode;
};

type valueType = {
  channels: channelType[];
  setChannels: Dispatch<SetStateAction<channelType[]>>;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  workspaceId: string;
  setWorkspaceId: Dispatch<SetStateAction<string>>;
  messageToEdit: messageType | null;
  setMessageToEdit: Dispatch<SetStateAction<messageType | null>>;
  threadToEdit: threadType | null;
  setThreadToEdit: Dispatch<SetStateAction<threadType | null>>;
};

export type threadType = {
  id: string;
  text: string;
  date: string;
  user: {
    fullName: string;
    username: string;
  };
};

export type messageType = {
  id: string;
  text: string;
  date: string;
  user: {
    fullName: string;
    username: string;
  };
  threads: threadType[];
};

export type channelType = {
  id: string;
  name: string;
  type: "PUBLIC" | "PRIVATE" | "DIRECT";
  message: messageType[];
};

const defaultValues = {
  channels: [],
  setChannels: () => [],
  username: "",
  workspaceId: "",
  setWorkspaceId: () => "",
  setUsername: () => "",
  setMessageToEdit: () => null,
  messageToEdit: null,
  threadToEdit: null,
  setThreadToEdit: () => null,
} as valueType;

export const ChatContext = createContext<valueType>(defaultValues);
export function ChatProvider({ children }: ChatProviderProps) {
  const [username, setUsername] = useState("");
  const [workspaceId, setWorkspaceId] = useState("");
  const [channels, setChannels] = useState<channelType[]>([]);

  // for Editing a specific message in a channel
  const [messageToEdit, setMessageToEdit] = useState<messageType | null>(null);

  // for Editing a specific thread in a message
  const [threadToEdit, setThreadToEdit] = useState<threadType | null>(null);

  const values = {
    channels,
    username,
    workspaceId,
    messageToEdit,
    threadToEdit,
    setUsername,
    setWorkspaceId,
    setChannels,
    setMessageToEdit,
    setThreadToEdit,
  };
  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
}