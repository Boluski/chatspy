"use client";

import { Button } from "@mantine/core";
import { signOut } from "aws-amplify/auth";
import outputs from "../../../amplify_outputs.json";
import { Amplify } from "aws-amplify";

Amplify.configure(outputs);

export default function Workspace() {
  return (
    <>
      WorkSpace <Button onClick={async () => await signOut()}>Sign Out</Button>
    </>
  );
}
