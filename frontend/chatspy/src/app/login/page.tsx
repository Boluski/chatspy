"use client";

import {
  Paper,
  Stack,
  Title,
  PasswordInput,
  TextInput,
  Button,
} from "@mantine/core";
import FormBase from "../components/formBase";
import { useState } from "react";
import * as EmailValidator from "email-validator";
import passwordValidator from "password-validator";

export default function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [canLogin, setCanLogin] = useState(false);

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
                  setCanLogin(true);
                } else {
                  setCanLogin(false);
                }
              } else {
                setEmailError("This is not a valid email address.");
                setCanLogin(false);
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
                  setCanLogin(true);
                } else {
                  setCanLogin(false);
                }
              } else {
                setPasswordError(
                  "Password must contain uppercase, lowercase, number, symbol, and must be at least 8 characters."
                );
                setCanLogin(false);
              }
            }}
          />
          <Button disabled={!canLogin} color="violet.8" onClick={handleClick}>
            Login
          </Button>
        </Stack>
      </Paper>
    </FormBase>
  );

  function handleClick() {
    console.log("Email", email);
    console.log("Password", password);
  }
}
