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
  PinInput,
  DEFAULT_THEME,
} from "@mantine/core";
import FormBase from "../components/formBase";
import { useState } from "react";
import * as EmailValidator from "email-validator";
import passwordValidator from "password-validator";
import { AiOutlineMail } from "react-icons/ai";
import { Amplify } from "aws-amplify";
import { signUp, confirmSignUp, signIn } from "aws-amplify/auth";
import outputs from "../../../amplify_outputs.json";
import { useMutation } from "@apollo/client";
import { gql } from "../../__generated__/gql";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CREATE_USER_QUERY = gql(`
        mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            user {
            username
            fullName
            email
            }
        }
        }
    `);

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

Amplify.configure(outputs);
export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [enableSignUp, setEnableSignUp] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);

  const [enableVerify, setEnableVerify] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const [pinCode, setPinCode] = useState("");
  const [pinError, setPinError] = useState(false);

  const [nextStep, setNextStep] = useState(false);

  const [createUserFunction] = useMutation(CREATE_USER_QUERY);

  const router = useRouter();

  return (
    <FormBase
      title="Everything has a beginning!"
      message="Get ready to speed up your communication and get projects done."
    >
      <Paper shadow="xl" radius={"0.5rem"}>
        {nextStep ? (
          <Stack
            style={{ borderRadius: "0.5rem" }}
            w={"35rem"}
            bg={"gray.0"}
            p={"lg"}
            align="center"
          >
            <Title c={"violet.8"} size={"2rem"}>
              Verify Email
            </Title>

            <AiOutlineMail
              size={"12rem"}
              color={`${DEFAULT_THEME.colors.violet[8]}`}
            />

            <Stack align="center" gap={4}>
              <PinInput
                error={pinError}
                length={6}
                size="lg"
                inputMode="numeric"
                onChange={(value: string) => {
                  setPinCode(value);
                  console.log(value);

                  if (value.length == 6) {
                    setEnableVerify(true);
                  } else setEnableVerify(false);
                }}
              />
              <Title hidden={!pinError} c={"red"} order={4}>
                Invalid pin code
              </Title>
            </Stack>

            <Button
              w={"100%"}
              disabled={!enableVerify}
              color="violet.8"
              onClick={handleVerify}
              loading={verifyLoading}
            >
              Verify Code
            </Button>
          </Stack>
        ) : (
          <Stack
            style={{ borderRadius: "0.5rem" }}
            w={"35rem"}
            bg={"gray.0"}
            p={"lg"}
          >
            <Title c={"violet.8"} size={"2rem"}>
              Create Account
            </Title>
            <TextInput
              label="Full Name:"
              error={fullNameError}
              onChange={(event) => {
                setFullName(event.currentTarget.value);
                if (event.currentTarget.value.trim() != "") {
                  setFullNameError("");
                  if (password == "" || confirmPassword == "" || email == "") {
                    setEnableSignUp(false);
                  } else {
                    setEnableSignUp(true);
                  }
                } else {
                  setFullNameError("A full name is required.");
                  setEnableSignUp(false);
                }
              }}
            />
            <TextInput
              label="Email:"
              error={emailError}
              onChange={(event) => {
                setEmail(event.currentTarget.value);
                if (EmailValidator.validate(event.currentTarget.value)) {
                  setEmailError("");
                  if (
                    password == "" ||
                    confirmPassword == "" ||
                    fullName == ""
                  ) {
                    setEnableSignUp(false);
                  } else {
                    setEnableSignUp(true);
                  }
                } else {
                  setEmailError("This is not a valid email address.");
                  setEnableSignUp(false);
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
                  if (fullName == "" || confirmPassword == "" || email == "") {
                    setEnableSignUp(false);
                  } else {
                    setEnableSignUp(true);
                  }
                } else {
                  setPasswordError(
                    "Password must contain uppercase, lowercase, number, symbol, and must be at least 8 characters."
                  );
                  setEnableSignUp(false);
                }
              }}
            />
            <PasswordInput
              label="Confirm Password:"
              error={confirmPasswordError}
              onChange={(event) => {
                setConfirmPassword(event.currentTarget.value);
                if (passwordSchema.validate(event.currentTarget.value)) {
                  if (event.currentTarget.value == password) {
                    setConfirmPasswordError("");
                    if (password == "" || fullName == "" || email == "") {
                      setEnableSignUp(false);
                    } else {
                      setEnableSignUp(true);
                    }
                  } else {
                    setConfirmPasswordError("Passwords don't match.");
                    setEnableSignUp(false);
                  }
                } else {
                  setConfirmPasswordError(
                    "Password must contain uppercase, lowercase, number, symbol, and must be at least 8 characters."
                  );
                  setEnableSignUp(false);
                }
              }}
            />
            <Button
              disabled={!enableSignUp}
              color="violet.8"
              onClick={handleSignUp}
              loading={signUpLoading}
            >
              Create Account
            </Button>
            <Center>
              <Anchor
                component={Link}
                href={"login/"}
                c={"violet.8"}
                underline="always"
              >
                Have an account - Login
              </Anchor>
            </Center>
          </Stack>
        )}
      </Paper>
    </FormBase>
  );

  async function handleSignUp() {
    setSignUpLoading(true);

    const newUser = await createUserFunction({
      variables: {
        input: {
          fullName: fullName,
          email: email,
          profilePicture: "",
        },
      },
    });

    if (newUser.data?.createUser.user == null) {
      setEmailError("This email has already been used.");
      setSignUpLoading(false);
    } else {
      await signUp({
        username: email,
        password: password,

        options: {
          userAttributes: {
            preferred_username: newUser.data.createUser.user.username,
          },
        },
      });

      setNextStep(true);
    }
  }

  async function handleVerify() {
    setVerifyLoading(true);
    console.log("Pin Code", pinCode);

    try {
      await confirmSignUp({
        username: email,
        confirmationCode: pinCode,
      });

      await signIn({
        username: email,
        password: password,
      });

      router.push("/workspace");
    } catch (error) {
      setPinError(true);
      setVerifyLoading(false);
    }
  }
}
