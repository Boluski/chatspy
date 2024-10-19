"use client";

import {
  Paper,
  Stack,
  Title,
  PasswordInput,
  TextInput,
  Button,
  Anchor,
  Center,
  Loader,
  Group,
} from "@mantine/core";
import FormBase from "../components/formBase";
import { useEffect, useState } from "react";
import * as EmailValidator from "email-validator";
import passwordValidator from "password-validator";
import { fetchUserAttributes, signIn } from "aws-amplify/auth";
import outputs from "../../../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import Link from "next/link";
import { useRouter } from "next/navigation";

Amplify.configure(outputs);

const passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(8)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .symbols()
  .has()
  .not()
  .spaces();
export default function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [enableLogin, setEnableLogin] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    handleInitialLoad();
  }, []);

  return (
    <FormBase
      title="Welcome Back👋"
      message="Time to chat and collaborate with the team!"
    >
      {loading ? (
        <Group>
          <Loader size={"xl"} color={"violet.8"} />
          <Title c={"violet.8"} order={2}>
            Loading...
          </Title>
        </Group>
      ) : (
        <Paper shadow="xl" radius={"0.5rem"}>
          <Stack
            style={{ borderRadius: "0.5rem" }}
            w={"35rem"}
            bg={"gray.0"}
            p={"lg"}
          >
            <Title c={"violet.8"} size={"2rem"}>
              Login
            </Title>
            <TextInput
              label="Email:"
              error={emailError}
              onChange={(event) => {
                setEmail(event.currentTarget.value);
                if (EmailValidator.validate(event.currentTarget.value)) {
                  setEmailError("");
                  if (password != "") {
                    setEnableLogin(true);
                  } else {
                    setEnableLogin(false);
                  }
                } else {
                  setEmailError("This is not a valid email address.");
                  setEnableLogin(false);
                }
              }}
            />
            <PasswordInput
              label="Password:"
              error={passwordError}
              onChange={(event) => {
                setPassword(event.currentTarget.value);
                if (passwordSchema.validate(event.currentTarget.value)) {
                  setPasswordError("");
                  if (email != "") {
                    setEnableLogin(true);
                  } else {
                    setEnableLogin(false);
                  }
                } else {
                  setPasswordError(
                    "Password must contain uppercase, lowercase, number, symbol, and must be at least 8 characters."
                  );
                  setEnableLogin(false);
                }
              }}
            />
            <Button
              disabled={!enableLogin}
              loading={loginLoading}
              color="violet.8"
              onClick={handleClick}
            >
              Login
            </Button>
            <Center>
              <Anchor
                component={Link}
                href={"signUp/"}
                c={"violet.8"}
                underline="always"
              >
                Don't have an account - Create an account
              </Anchor>
            </Center>
          </Stack>
        </Paper>
      )}
    </FormBase>
  );

  async function handleClick() {
    setLoginLoading(true);

    try {
      await signIn({
        username: email,
        password: password,
      });

      const workspaceToJoin = sessionStorage.getItem("workspaceToJoin");
      if (workspaceToJoin) {
        sessionStorage.removeItem("workspaceToJoin");
        router.push(`join/${workspaceToJoin}`);
      } else {
        router.push("/workspace");
      }
    } catch (error) {
      setEmailError("Email may be incorrect.");
      setPasswordError("Password may be incorrect.");
      setLoginLoading(false);
    }
  }

  async function handleInitialLoad() {
    try {
      const { preferred_username } = await fetchUserAttributes();
      if (preferred_username) {
        const lastVisitedWorkspace = localStorage.getItem(
          "lastVisitedWorkspace"
        );

        if (lastVisitedWorkspace) {
          router.push(`/workspace/${lastVisitedWorkspace}`);
        } else router.push("/workspace");
      }
    } catch (error) {
      setLoading(false);
    }
  }
}
