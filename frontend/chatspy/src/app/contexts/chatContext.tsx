"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";

type ChatProviderProps = {
  children: React.ReactNode;
};

type valueType = {
  channels: channelType[];
  setChannels: Dispatch<SetStateAction<channelType[]>>;
};

type channelType = {
  id: string;
  name: string;
  type: "PUBLIC" | "PRIVATE" | "DIRECT";
};

const defaultValues = {
  channels: [],
  setChannels: () => [],
} as valueType;

export const chatContext = createContext<valueType>(defaultValues);
export function ChatProvider({ children }: ChatProviderProps) {
  const [channels, setChannels] = useState<channelType[]>([]);
  const values = {
    channels,
    setChannels,
  };
  return <chatContext.Provider value={values}>{children}</chatContext.Provider>;
}
