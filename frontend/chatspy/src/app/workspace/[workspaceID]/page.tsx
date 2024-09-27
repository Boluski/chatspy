"use Client";

type Workspace = {
  params: { workspaceID: string };
};

export default function Workspace({ params }: Workspace) {
  return <h1>Workspace: {params.workspaceID}</h1>;
}
