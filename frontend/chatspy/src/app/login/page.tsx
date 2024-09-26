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
} from "@mantine/core";
import FormBase from "../components/formBase";
import { useState } from "react";
import * as EmailValidator from "email-validator";
import passwordValidator from "password-validator";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [enableLogin, setEnableLogin] = useState(false);

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

  return (
    <FormBase
      title="Welcome Back"
      message="Time to chat and collaborate with the team!"
    >
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
    </FormBase>
  );

  function handleClick() {
    console.log("Email", email);
    console.log("Password", password);
  }
}
