"use client";

type JoinProps = {
  params: { workspaceID: string };
};

function Join({ params }: JoinProps) {
  return <>{params.workspaceID}</>;
}

export default Join;
