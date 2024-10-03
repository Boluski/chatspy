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
};

type messageType = {};

type channelType = {
  id: string;
  name: string;
  type: "PUBLIC" | "PRIVATE" | "DIRECT";
};

const defaultValues = {
  channels: [],
  setChannels: () => [],
  username: "",
  workspaceId: "",
  setWorkspaceId: () => "",
  setUsername: () => "",
} as valueType;

export const ChatContext = createContext<valueType>(defaultValues);
export function ChatProvider({ children }: ChatProviderProps) {
  const [username, setUsername] = useState("");
  const [workspaceId, setWorkspaceId] = useState("");
  const [channels, setChannels] = useState<channelType[]>([]);
  const values = {
    channels,
    username,
    workspaceId,
    setUsername,
    setWorkspaceId,
    setChannels,
  };
  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
}
