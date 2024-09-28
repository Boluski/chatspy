/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type AddUserToChannelInput = {
  privateChannelId: Scalars['UUID']['input'];
  username: Scalars['String']['input'];
};

export type AddUserToChannelPayload = {
  __typename?: 'AddUserToChannelPayload';
  channel?: Maybe<Channel>;
};

export type AddUserToWorkspaceInput = {
  username: Scalars['String']['input'];
  workspaceID: Scalars['UUID']['input'];
};

export type AddUserToWorkspacePayload = {
  __typename?: 'AddUserToWorkspacePayload';
  workspace?: Maybe<Workspace>;
};

export type Channel = {
  __typename?: 'Channel';
  id: Scalars['UUID']['output'];
  messages: Array<Message>;
  name: Scalars['String']['output'];
  type: ChannelType;
  users: Array<User>;
};

/** A connection to a list of items. */
export type ChannelMessagesConnection = {
  __typename?: 'ChannelMessagesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ChannelMessagesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Message>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ChannelMessagesEdge = {
  __typename?: 'ChannelMessagesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Message;
};

export enum ChannelType {
  Direct = 'DIRECT',
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type CreateChannelInput = {
  directUsername?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  rootUsername?: InputMaybe<Scalars['String']['input']>;
  type: ChannelType;
  workspaceId: Scalars['UUID']['input'];
};

export type CreateChannelPayload = {
  __typename?: 'CreateChannelPayload';
  channel?: Maybe<Channel>;
};

export type CreateMessageInput = {
  channelId: Scalars['UUID']['input'];
  text: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateMessagePayload = {
  __typename?: 'CreateMessagePayload';
  message?: Maybe<Message>;
};

export type CreateThreadInput = {
  messageID: Scalars['UUID']['input'];
  text: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateThreadPayload = {
  __typename?: 'CreateThreadPayload';
  thread?: Maybe<Thread>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  profilePicture: Scalars['String']['input'];
};

export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  user?: Maybe<User>;
};

export type CreateWorkspaceInput = {
  name: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateWorkspacePayload = {
  __typename?: 'CreateWorkspacePayload';
  workspace?: Maybe<Workspace>;
};

export type DeleteChannelInput = {
  channelId: Scalars['UUID']['input'];
};

export type DeleteChannelPayload = {
  __typename?: 'DeleteChannelPayload';
  channel?: Maybe<Channel>;
};

export type DeleteMessageInput = {
  messageId: Scalars['UUID']['input'];
};

export type DeleteMessagePayload = {
  __typename?: 'DeleteMessagePayload';
  message?: Maybe<Message>;
};

export type DeleteThreadInput = {
  threadId: Scalars['UUID']['input'];
};

export type DeleteThreadPayload = {
  __typename?: 'DeleteThreadPayload';
  thread?: Maybe<Thread>;
};

export type DeleteUserInput = {
  username: Scalars['ID']['input'];
};

export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  user?: Maybe<User>;
};

export type DeleteWorkspaceInput = {
  id: Scalars['ID']['input'];
};

export type DeleteWorkspacePayload = {
  __typename?: 'DeleteWorkspacePayload';
  workspace?: Maybe<Workspace>;
};

export type EditMessageInput = {
  messageId: Scalars['UUID']['input'];
  text: Scalars['String']['input'];
};

export type EditMessagePayload = {
  __typename?: 'EditMessagePayload';
  message?: Maybe<Message>;
};

export type EditThreadInput = {
  text: Scalars['String']['input'];
  threadId: Scalars['UUID']['input'];
};

export type EditThreadPayload = {
  __typename?: 'EditThreadPayload';
  thread?: Maybe<Thread>;
};

export type Message = {
  __typename?: 'Message';
  date: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  text: Scalars['String']['output'];
  threads: Array<Thread>;
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Adds a user to a private channel based on the username and the channelId. */
  addUserToChannel: AddUserToChannelPayload;
  /** Adds a user to a workspace based on the workspaceId and the username. */
  addUserToWorkspace: AddUserToWorkspacePayload;
  /** Creates a new channel in a workspace based on the workspaceId and channel type. */
  createChannel: CreateChannelPayload;
  /** Creates a new message based on the username and channelId */
  createMessage: CreateMessagePayload;
  /** Creates a new thread based on the username and messageId */
  createThread: CreateThreadPayload;
  /** Creates a new user and generates the username. */
  createUser: CreateUserPayload;
  /** Creates a new workspace and generates the guid. */
  createWorkspace: CreateWorkspacePayload;
  /** Deletes a channel based on its Id. */
  deleteChannel: DeleteChannelPayload;
  /** Deletes a message based on it's Id. */
  deleteMessage: DeleteMessagePayload;
  /** Deletes a thread based on it's Id. */
  deleteThread: DeleteThreadPayload;
  /** Deletes a user based on the username. */
  deleteUser: DeleteUserPayload;
  /** Deletes a workspace based on its ID. */
  deleteWorkspace: DeleteWorkspacePayload;
  /** Edits the message's text based on it's Id. */
  editMessage: EditMessagePayload;
  /** Edits the thread's text based on it's Id. */
  editThread: EditThreadPayload;
  /** Removes a user from a workspace based on the workspaceId and the username. */
  removeUserFromWorkspace: RemoveUserFromWorkspacePayload;
  /** Updates the name of a channel. This should be used only for public and private channels. */
  updateChannelName: UpdateChannelNamePayload;
  /** Updates a user's meta data based on the username. */
  updateUser: UpdateUserPayload;
  /** Updates the workspace name or/and the createdBy fields with its Id. */
  updateWorkspace: UpdateWorkspacePayload;
};


export type MutationAddUserToChannelArgs = {
  input: AddUserToChannelInput;
};


export type MutationAddUserToWorkspaceArgs = {
  input: AddUserToWorkspaceInput;
};


export type MutationCreateChannelArgs = {
  input: CreateChannelInput;
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


export type MutationCreateThreadArgs = {
  input: CreateThreadInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateWorkspaceArgs = {
  input: CreateWorkspaceInput;
};


export type MutationDeleteChannelArgs = {
  input: DeleteChannelInput;
};


export type MutationDeleteMessageArgs = {
  input: DeleteMessageInput;
};


export type MutationDeleteThreadArgs = {
  input: DeleteThreadInput;
};


export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


export type MutationDeleteWorkspaceArgs = {
  input: DeleteWorkspaceInput;
};


export type MutationEditMessageArgs = {
  input: EditMessageInput;
};


export type MutationEditThreadArgs = {
  input: EditThreadInput;
};


export type MutationRemoveUserFromWorkspaceArgs = {
  input: RemoveUserFromWorkspaceInput;
};


export type MutationUpdateChannelNameArgs = {
  input: UpdateChannelNameInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateWorkspaceArgs = {
  input: UpdateWorkspaceInput;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  /** Returns up to ten messages based on the channelId and cursor. */
  channelMessages?: Maybe<ChannelMessagesConnection>;
  /** Returns a user based on an email */
  userByEmail: User;
  /** Returns a user based on a username */
  userByUsername: User;
  /** Returns a workspace based on an it's id and username */
  workspaceByID: Workspace;
};


export type QueryChannelMessagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  channelId: Scalars['UUID']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryUserByUsernameArgs = {
  username: Scalars['String']['input'];
};


export type QueryWorkspaceByIdArgs = {
  username: Scalars['String']['input'];
  workspaceID: Scalars['UUID']['input'];
};

export type RemoveUserFromWorkspaceInput = {
  username: Scalars['String']['input'];
  workspaceID: Scalars['UUID']['input'];
};

export type RemoveUserFromWorkspacePayload = {
  __typename?: 'RemoveUserFromWorkspacePayload';
  workspace?: Maybe<Workspace>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Is triggered when a new message is deleted. */
  onMessageDeleted: Message;
  /** Is triggered when a new message is created. */
  onMessageSent: Message;
  /** Is triggered when a new message is edited. */
  onMessageUpdated: Message;
  /** Is triggered when a new thread is deleted. */
  onThreadDeleted: Thread;
  /** Is triggered when a new thread is created. */
  onThreadSent: Thread;
  /** Is triggered when a new thread is edited. */
  onThreadUpdated: Thread;
};


export type SubscriptionOnMessageDeletedArgs = {
  messageId: Scalars['UUID']['input'];
};


export type SubscriptionOnMessageSentArgs = {
  channelId: Scalars['UUID']['input'];
};


export type SubscriptionOnMessageUpdatedArgs = {
  messageId: Scalars['UUID']['input'];
};


export type SubscriptionOnThreadDeletedArgs = {
  threadId: Scalars['UUID']['input'];
};


export type SubscriptionOnThreadSentArgs = {
  messageId: Scalars['UUID']['input'];
};


export type SubscriptionOnThreadUpdatedArgs = {
  threadId: Scalars['UUID']['input'];
};

export type Thread = {
  __typename?: 'Thread';
  date: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  text: Scalars['String']['output'];
  user: User;
};

export type UpdateChannelNameInput = {
  channelId: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateChannelNamePayload = {
  __typename?: 'UpdateChannelNamePayload';
  channel?: Maybe<Channel>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['ID']['input'];
};

export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  user?: Maybe<User>;
};

export type UpdateWorkspaceInput = {
  createdBy?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateWorkspacePayload = {
  __typename?: 'UpdateWorkspacePayload';
  workspace?: Maybe<Workspace>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  profilePicture: Scalars['String']['output'];
  username: Scalars['String']['output'];
  workspaces: Array<Workspace>;
};

export type Workspace = {
  __typename?: 'Workspace';
  channels: Array<Channel>;
  createdBy: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  users: Array<User>;
};

export type CreateWorkspaceMutationVariables = Exact<{
  input: CreateWorkspaceInput;
}>;


export type CreateWorkspaceMutation = { __typename?: 'Mutation', createWorkspace: { __typename?: 'CreateWorkspacePayload', workspace?: { __typename?: 'Workspace', id: any, name: string } | null } };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'CreateUserPayload', user?: { __typename?: 'User', username: string, fullName: string, email: string } | null } };

export type UserDataQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UserDataQuery = { __typename?: 'Query', userByUsername: { __typename?: 'User', username: string, fullName: string, email: string, workspaces: Array<{ __typename?: 'Workspace', id: any, name: string, createdBy: string }> } };

export type WorkspaceByIdQueryVariables = Exact<{
  workspaceId: Scalars['UUID']['input'];
  username: Scalars['String']['input'];
}>;


export type WorkspaceByIdQuery = { __typename?: 'Query', workspaceByID: { __typename?: 'Workspace', id: any, name: string, createdBy: string } };

export type UserByUsernameQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UserByUsernameQuery = { __typename?: 'Query', userByUsername: { __typename?: 'User', username: string, fullName: string, email: string, workspaces: Array<{ __typename?: 'Workspace', id: any, name: string }> } };


export const CreateWorkspaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateWorkspace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateWorkspaceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWorkspace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workspace"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CreateWorkspaceMutation, CreateWorkspaceMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const UserDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"workspaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}}]}}]}}]}}]} as unknown as DocumentNode<UserDataQuery, UserDataQueryVariables>;
export const WorkspaceByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WorkspaceByID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workspaceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workspaceByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"workspaceID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workspaceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}}]}}]}}]} as unknown as DocumentNode<WorkspaceByIdQuery, WorkspaceByIdQueryVariables>;
export const UserByUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserByUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"workspaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UserByUsernameQuery, UserByUsernameQueryVariables>;