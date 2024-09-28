import type { Metadata } from "next";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ApolloWrapper } from "./ApolloWrapper";
import { UserProvider } from "./contexts/userContext";

export const metadata: Metadata = {
  title: "Chatspy",
  description: "Team messaging app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <ApolloWrapper>
            <UserProvider>{children}</UserProvider>
          </ApolloWrapper>
        </MantineProvider>
      </body>
    </html>
  );
}
