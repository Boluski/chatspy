import { Stack, TextInput, Button, TagsInput } from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "../../__generated__/gql";
import * as EmailValidator from "email-validator";

type AddMemberModalProps = {
  closeFunction: () => void;
};

export default function AddMemberModal({ closeFunction }: AddMemberModalProps) {
  const [emailList, setEmailList] = useState<string[]>([]);
  const [emailError, setEmailError] = useState("");
  const [enableAddMember, setEnableAddMember] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <Stack>
      <TagsInput
        clearable
        size={"md"}
        label="Emails"
        description="After typing an email, press the enter key to add it."
        styles={{
          label: { fontWeight: "bold", fontSize: "1.3rem" },
          description: { fontWeight: "500", fontSize: "1rem" },
        }}
        error={emailError}
        data={[]}
        onChange={(emails) => {
          setEmailList(emails);
          if (emails.length == 0) {
            setEmailError("Please add at least one email.");
            setEnableAddMember(false);
          }
          for (let index = 0; index < emails.length; index++) {
            const email = emails[index];
            if (EmailValidator.validate(email)) {
              setEmailError("");
              setEnableAddMember(true);
            } else {
              setEmailError("Some tags do not correspond to an email address!");
              setEnableAddMember(false);
            }
          }
        }}
      />
      <Button
        disabled={!enableAddMember}
        onClick={handleAddMembers}
        size="md"
        color="violet.8"
        loading={loading}
      >
        Create Workspace
      </Button>
    </Stack>
  );

  function handleAddMembers() {
    setLoading(true);
    // console.log(emailList);
    closeFunction();
  }
}
