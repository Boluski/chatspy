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
  showThread: boolean;
  setShowThread: Dispatch<SetStateAction<boolean>>;
  messageThread: messageType | null;
  setMessageThread: Dispatch<SetStateAction<messageType | null>>;
};

export type messageType = {
  id: string;
  text: string;
  date: string;
  user: {
    fullName: string;
    username: string;
  };
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
  showThread: false,
  setShowThread: () => false,
  setMessageThread: () => null,
  messageThread: null,
} as valueType;

export const ChatContext = createContext<valueType>(defaultValues);
export function ChatProvider({ children }: ChatProviderProps) {
  const [username, setUsername] = useState("");
  const [workspaceId, setWorkspaceId] = useState("");
  const [channels, setChannels] = useState<channelType[]>([]);
  const [showThread, setShowThread] = useState(false);

  // for Editing a specific message in a channel
  const [messageToEdit, setMessageToEdit] = useState<messageType | null>(null);

  const [messageThread, setMessageThread] = useState<messageType | null>(null);
  const values = {
    channels,
    username,
    workspaceId,
    messageToEdit,
    showThread,
    messageThread,
    setUsername,
    setWorkspaceId,
    setChannels,
    setMessageToEdit,
    setShowThread,
    setMessageThread,
  };
  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
}
