/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    mutation AddUserToWorkspace($input: AddUserToWorkspaceInput!) {\n  addUserToWorkspace(input: $input) {\n    workspace {\n      id\n    }\n  }\n}\n    ": types.AddUserToWorkspaceDocument,
    "\n    subscription OnMessageSent($channelId: UUID!) {\n  onMessageSent(channelId: $channelId) {\n    id\n    text\n    date\n    user {\n      username\n      fullName\n    }\n  }\n}\n    ": types.OnMessageSentDocument,
    "\n    mutation CreateChannel($input: CreateChannelInput!) {\n  createChannel(input: $input) {\n    channel {\n      id\n      name\n      type\n    }\n  }\n}\n    ": types.CreateChannelDocument,
    "\nmutation CreateWorkspace($input: CreateWorkspaceInput!) {\n  createWorkspace(input: $input) {\n    workspace {\n      id\n      name\n    }\n  }\n}\n    ": types.CreateWorkspaceDocument,
    "\n    mutation DeleteMessage($input: DeleteMessageInput!) {\n  deleteMessage(input: $input) {\n    message {\n      id\n      text\n      date\n    }\n  }\n}\n    ": types.DeleteMessageDocument,
    "\nsubscription OnMessageDeleted($messageTopic: String!) {\n  onMessageDeleted(messageTopic: $messageTopic) {\n    id\n    text\n    date\n  }\n}\n    ": types.OnMessageDeletedDocument,
    "\n    subscription OnMessageUpdated($messageTopic: String!) {\n  onMessageUpdated(messageTopic: $messageTopic) {\n    id\n    text\n  }\n}\n    ": types.OnMessageUpdatedDocument,
    "\n  subscription OnThreadSentMessageBox($messageId: UUID!) {\n  onThreadSent(messageId: $messageId) {\n    id\n    text\n    date\n    user {\n      username\n      fullName\n    }\n  }\n}\n  ": types.OnThreadSentMessageBoxDocument,
    "\nmutation Mutation($input: CreateMessageInput!) {\n    createMessage(input: $input) {\n      message {\n        id\n        text\n        date\n        user {\n          username\n          fullName\n        }\n      }\n    }\n  }": types.MutationDocument,
    "\n  mutation EditMessage($input: EditMessageInput!) {\n  editMessage(input: $input) {\n    message {\n      id\n      text\n      date\n    }\n  }\n}\n  ": types.EditMessageDocument,
    "\nmutation DeleteThread($input: DeleteThreadInput!) {\n  deleteThread(input: $input) {\n    thread {\n      id\n    }\n  }\n}\n      ": types.DeleteThreadDocument,
    "\nsubscription OnThreadDeleted($threadTopic: String!) {\n  onThreadDeleted(threadTopic: $threadTopic) {\n    id\n  }\n}\n      ": types.OnThreadDeletedDocument,
    "\n      subscription OnMessageUpdated($messageTopic: String!) {\n    onMessageUpdated(messageTopic: $messageTopic) {\n      id\n      text\n    }\n  }\n      ": types.OnMessageUpdatedDocument,
    "\nmutation CreateThread($input: CreateThreadInput!) {\n  createThread(input: $input) {\n    thread {\n      id\n      text\n      date\n      user {\n          username\n          fullName\n        }\n    }\n  }\n}\n  ": types.CreateThreadDocument,
    "\n  subscription OnThreadSent($messageId: UUID!) {\n  onThreadSent(messageId: $messageId) {\n    id\n    text\n    date\n    user {\n      username\n      fullName\n    }\n  }\n}\n  ": types.OnThreadSentDocument,
    "\n  subscription OnThreadDeleted_TV($threadTopic: String!) {\n    onThreadDeleted(threadTopic: $threadTopic) {\n      id\n    }\n  }\n        ": types.OnThreadDeleted_TvDocument,
    "\n        mutation CreateUser($input: CreateUserInput!) {\n        createUser(input: $input) {\n            user {\n            username\n            fullName\n            email\n            }\n        }\n        }\n    ": types.CreateUserDocument,
    "\n  query UserData($username: String!) {\nuserByUsername(username: $username) {\n  username\n  fullName\n  email\n  workspaces {\n    id\n    name\n    createdBy\n  }\n}\n}\n  ": types.UserDataDocument,
    "\nquery WorkspaceByID($workspaceId: UUID!, $username: String!) {\n  workspaceByID(workspaceID: $workspaceId, username: $username) {\n    id\n    name\n    createdBy\n    channels {\n      id\n      name\n      type\n      messages {\n        id\n        text\n        date\n   \n        user {\n          username\n          fullName\n        }     \n        threads {\n          id\n          text\n          date\n          user {\n            username\n            fullName\n          }\n        }\n      }\n    }\n  }\n}\n  ": types.WorkspaceByIdDocument,
    "\n  query UserByUsername($username: String!) {\n  userByUsername(username: $username) {\n    username\n    fullName\n    email\n    workspaces {\n      id\n      name\n    }\n  }\n}\n  ": types.UserByUsernameDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation AddUserToWorkspace($input: AddUserToWorkspaceInput!) {\n  addUserToWorkspace(input: $input) {\n    workspace {\n      id\n    }\n  }\n}\n    "): (typeof documents)["\n    mutation AddUserToWorkspace($input: AddUserToWorkspaceInput!) {\n  addUserToWorkspace(input: $input) {\n    workspace {\n      id\n    }\n  }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    subscription OnMessageSent($channelId: UUID!) {\n  onMessageSent(channelId: $channelId) {\n    id\n    text\n    date\n    user {\n      username\n      fullName\n    }\n  }\n}\n    "): (typeof documents)["\n    subscription OnMessageSent($channelId: UUID!) {\n  onMessageSent(channelId: $channelId) {\n    id\n    text\n    date\n    user {\n      username\n      fullName\n    }\n  }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateChannel($input: CreateChannelInput!) {\n  createChannel(input: $input) {\n    channel {\n      id\n      name\n      type\n    }\n  }\n}\n    "): (typeof documents)["\n    mutation CreateChannel($input: CreateChannelInput!) {\n  createChannel(input: $input) {\n    channel {\n      id\n      name\n      type\n    }\n  }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateWorkspace($input: CreateWorkspaceInput!) {\n  createWorkspace(input: $input) {\n    workspace {\n      id\n      name\n    }\n  }\n}\n    "): (typeof documents)["\nmutation CreateWorkspace($input: CreateWorkspaceInput!) {\n  createWorkspace(input: $input) {\n    workspace {\n      id\n      name\n    }\n  }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteMessage($input: DeleteMessageInput!) {\n  deleteMessage(input: $input) {\n    message {\n      id\n      text\n      date\n    }\n  }\n}\n    "): (typeof documents)["\n    mutation DeleteMessage($input: DeleteMessageInput!) {\n  deleteMessage(input: $input) {\n    message {\n      id\n      text\n      date\n    }\n  }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nsubscription OnMessageDeleted($messageTopic: String!) {\n  onMessageDeleted(messageTopic: $messageTopic) {\n    id\n    text\n    date\n  }\n}\n    "): (typeof documents)["\nsubscription OnMessageDeleted($messageTopic: String!) {\n  onMessageDeleted(messageTopic: $messageTopic) {\n    id\n    text\n    date\n  }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    subscription OnMessageUpdated($messageTopic: String!) {\n  onMessageUpdated(messageTopic: $messageTopic) {\n    id\n    text\n  }\n}\n    "): (typeof documents)["\n    subscription OnMessageUpdated($messageTopic: String!) {\n  onMessageUpdated(messageTopic: $messageTopic) {\n    id\n    text\n  }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription OnThreadSentMessageBox($messageId: UUID!) {\n  onThreadSent(messageId: $messageId) {\n    id\n    text\n    date\n    user {\n      username\n      fullName\n    }\n  }\n}\n  "): (typeof documents)["\n  subscription OnThreadSentMessageBox($messageId: UUID!) {\n  onThreadSent(messageId: $messageId) {\n    id\n    text\n    date\n    user {\n      username\n      fullName\n    }\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation Mutation($input: CreateMessageInput!) {\n    createMessage(input: $input) {\n      message {\n        id\n        text\n        date\n        user {\n          username\n          fullName\n        }\n      }\n    }\n  }"): (typeof documents)["\nmutation Mutation($input: CreateMessageInput!) {\n    createMessage(input: $input) {\n      message {\n        id\n        text\n        date\n        user {\n          username\n          fullName\n        }\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation EditMessage($input: EditMessageInput!) {\n  editMessage(input: $input) {\n    message {\n      id\n      text\n      date\n    }\n  }\n}\n  "): (typeof documents)["\n  mutation EditMessage($input: EditMessageInput!) {\n  editMessage(input: $input) {\n    message {\n      id\n      text\n      date\n    }\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DeleteThread($input: DeleteThreadInput!) {\n  deleteThread(input: $input) {\n    thread {\n      id\n    }\n  }\n}\n      "): (typeof documents)["\nmutation DeleteThread($input: DeleteThreadInput!) {\n  deleteThread(input: $input) {\n    thread {\n      id\n    }\n  }\n}\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nsubscription OnThreadDeleted($threadTopic: String!) {\n  onThreadDeleted(threadTopic: $threadTopic) {\n    id\n  }\n}\n      "): (typeof documents)["\nsubscription OnThreadDeleted($threadTopic: String!) {\n  onThreadDeleted(threadTopic: $threadTopic) {\n    id\n  }\n}\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      subscription OnMessageUpdated($messageTopic: String!) {\n    onMessageUpdated(messageTopic: $messageTopic) {\n      id\n      text\n    }\n  }\n      "): (typeof documents)["\n      subscription OnMessageUpdated($messageTopic: String!) {\n    onMessageUpdated(messageTopic: $messageTopic) {\n      id\n      text\n    }\n  }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateThread($input: CreateThreadInput!) {\n  createThread(input: $input) {\n    thread {\n      id\n      text\n      date\n      user {\n          username\n          fullName\n        }\n    }\n  }\n}\n  "): (typeof documents)["\nmutation CreateThread($input: CreateThreadInput!) {\n  createThread(input: $input) {\n    thread {\n      id\n      text\n      date\n      user {\n          username\n          fullName\n        }\n    }\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription OnThreadSent($messageId: UUID!) {\n  onThreadSent(messageId: $messageId) {\n    id\n    text\n    date\n    user {\n      username\n      fullName\n    }\n  }\n}\n  "): (typeof documents)["\n  subscription OnThreadSent($messageId: UUID!) {\n  onThreadSent(messageId: $messageId) {\n    id\n    text\n    date\n    user {\n      username\n      fullName\n    }\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription OnThreadDeleted_TV($threadTopic: String!) {\n    onThreadDeleted(threadTopic: $threadTopic) {\n      id\n    }\n  }\n        "): (typeof documents)["\n  subscription OnThreadDeleted_TV($threadTopic: String!) {\n    onThreadDeleted(threadTopic: $threadTopic) {\n      id\n    }\n  }\n        "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        mutation CreateUser($input: CreateUserInput!) {\n        createUser(input: $input) {\n            user {\n            username\n            fullName\n            email\n            }\n        }\n        }\n    "): (typeof documents)["\n        mutation CreateUser($input: CreateUserInput!) {\n        createUser(input: $input) {\n            user {\n            username\n            fullName\n            email\n            }\n        }\n        }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query UserData($username: String!) {\nuserByUsername(username: $username) {\n  username\n  fullName\n  email\n  workspaces {\n    id\n    name\n    createdBy\n  }\n}\n}\n  "): (typeof documents)["\n  query UserData($username: String!) {\nuserByUsername(username: $username) {\n  username\n  fullName\n  email\n  workspaces {\n    id\n    name\n    createdBy\n  }\n}\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery WorkspaceByID($workspaceId: UUID!, $username: String!) {\n  workspaceByID(workspaceID: $workspaceId, username: $username) {\n    id\n    name\n    createdBy\n    channels {\n      id\n      name\n      type\n      messages {\n        id\n        text\n        date\n   \n        user {\n          username\n          fullName\n        }     \n        threads {\n          id\n          text\n          date\n          user {\n            username\n            fullName\n          }\n        }\n      }\n    }\n  }\n}\n  "): (typeof documents)["\nquery WorkspaceByID($workspaceId: UUID!, $username: String!) {\n  workspaceByID(workspaceID: $workspaceId, username: $username) {\n    id\n    name\n    createdBy\n    channels {\n      id\n      name\n      type\n      messages {\n        id\n        text\n        date\n   \n        user {\n          username\n          fullName\n        }     \n        threads {\n          id\n          text\n          date\n          user {\n            username\n            fullName\n          }\n        }\n      }\n    }\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query UserByUsername($username: String!) {\n  userByUsername(username: $username) {\n    username\n    fullName\n    email\n    workspaces {\n      id\n      name\n    }\n  }\n}\n  "): (typeof documents)["\n  query UserByUsername($username: String!) {\n  userByUsername(username: $username) {\n    username\n    fullName\n    email\n    workspaces {\n      id\n      name\n    }\n  }\n}\n  "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;