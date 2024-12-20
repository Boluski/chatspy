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
    "\n    mutation AddUserToChannelWM($input: AddUserToChannelInput!) {\n  addUserToChannel(input: $input) {\n    channel {\n      id\n      name\n      type\n      users {\n        fullName\n        username\n      }\n    }\n  }\n}\n    ": types.AddUserToChannelWmDocument,
    "\n    mutation RemoveUserFromChannel($input: RemoveUserFromChannelInput!) {\n  removeUserFromChannel(input: $input) {\n    channel {\n      id\n      name\n      type\n      users {\n        fullName\n        username\n      }\n    }\n  }\n}": types.RemoveUserFromChannelDocument,
    "\n    mutation UpdateUser($input: UpdateUserInput!) {\n  updateUser(input: $input) {\n    user {\n      username\n    }\n  }\n}\n    ": types.UpdateUserDocument,
    "\n    mutation DeleteUser($input: DeleteUserInput!) {\n  deleteUser(input: $input) {\n    user {\n      username\n    }\n  }\n}\n    ": types.DeleteUserDocument,
    "\n  query UserByEmailAU($email: String!) {\n  userByEmail(email: $email) {\n    username\n    fullName\n  }\n}\n  ": types.UserByEmailAuDocument,
    "\n    mutation AddUserToWorkspace($input: AddUserToWorkspaceInput!) {\n  addUserToWorkspace(input: $input) {\n    workspace {\n      id\n    }\n  }\n}\n    ": types.AddUserToWorkspaceDocument,
    "\nsubscription OnMessageSent($channelId: String!) {\n  onMessageSent(channelId: $channelId) {\n    id\n    text\n    date\n    user {\n      username\n      fullName\n    }\n  }\n}\n    ": types.OnMessageSentDocument,
    "\n    mutation UpdateChannelName($input: UpdateChannelNameInput!) {\n  updateChannelName(input: $input) {\n    channel {\n      id\n      name\n    }\n  }\n}\n    ": types.UpdateChannelNameDocument,
    "\n        mutation DeleteChannel($input: DeleteChannelInput!) {\n  deleteChannel(input: $input) {\n    channel {\n      id\n      name\n    }\n  }\n}\n        ": types.DeleteChannelDocument,
    "\n    mutation CreateChannelDM($input: CreateChannelInput!) {\n  createChannel(input: $input) {\n    channel {\n      id\n      name\n      type\n      users {\n        fullName\n        username\n      }\n    }\n  }\n}\n    ": types.CreateChannelDmDocument,
    "\nsubscription OnDMChannelCreated($workspaceId: String!, $rootUsername: String!, $directUsername: String!) {\n  onDMChannelCreated(workspaceId: $workspaceId, rootUsername: $rootUsername, directUsername: $directUsername) {\n    id\n    name\n    type\n  }\n}\n    ": types.OnDmChannelCreatedDocument,
    "\n    mutation CreateChannel($input: CreateChannelInput!) {\n  createChannel(input: $input) {\n    channel {\n      id\n      name\n      type\n    }\n  }\n}\n    ": types.CreateChannelDocument,
    "\nmutation AddUserToChannel($input: AddUserToChannelInput!) {\n  addUserToChannel(input: $input) {\n    channel {\n      id\n      name\n      type\n      users {\n        fullName\n        username\n      }\n    }\n  }\n}\n  ": types.AddUserToChannelDocument,
    "\nmutation CreateWorkspace($input: CreateWorkspaceInput!) {\n  createWorkspace(input: $input) {\n    workspace {\n      id\n      name\n    }\n  }\n}\n    ": types.CreateWorkspaceDocument,
    "\n    mutation DeleteMessage($input: DeleteMessageInput!) {\n  deleteMessage(input: $input) {\n    message {\n      id\n      text\n      date\n    }\n  }\n}\n    ": types.DeleteMessageDocument,
    "\nsubscription OnMessageDeleted($messageId: String!) {\n  onMessageDeleted(messageId: $messageId) {\n    id\n  }\n}\n    ": types.OnMessageDeletedDocument,
    "\nsubscription OnMessageUpdated($messageId: String!) {\n  onMessageUpdated(messageId: $messageId) {\n    id\n    text\n  }\n}\n    ": types.OnMessageUpdatedDocument,
    "\nsubscription OnThreadSentMessageBox($messageId: String!) {\n  onThreadSent(messageId: $messageId) {\n    id\n    text\n    date\n    user {\n      username\n      fullName\n    }\n  }\n}\n  ": types.OnThreadSentMessageBoxDocument,
    "\n  subscription OnThreadDeletedMessageBox($messageId: String!) {\n    onThreadDeleted(messageId: $messageId) {\n      id\n      text\n      date\n    }\n  }\n        ": types.OnThreadDeletedMessageBoxDocument,
    "\n  subscription OnThreadUpdatedMessageBox($messageId: String!) {\n  onThreadUpdated(messageId: $messageId) {\n    id\n    text\n    date\n  }\n}\n  ": types.OnThreadUpdatedMessageBoxDocument,
    "\nmutation Mutation($input: CreateMessageInput!) {\n    createMessage(input: $input) {\n      message {\n        id\n        text\n        date\n        user {\n          username\n          fullName\n        }\n      }\n    }\n  }": types.MutationDocument,
    "\n  mutation EditMessage($input: EditMessageInput!) {\n  editMessage(input: $input) {\n    message {\n      id\n      text\n      date\n    }\n  }\n}\n  ": types.EditMessageDocument,
    "\nmutation DeleteThread($input: DeleteThreadInput!) {\n  deleteThread(input: $input) {\n    thread {\n      id\n    }\n  }\n}\n      ": types.DeleteThreadDocument,
    "\nmutation CreateThread($input: CreateThreadInput!) {\n  createThread(input: $input) {\n    thread {\n      id\n      text\n      date\n      user {\n          username\n          fullName\n        }\n    }\n  }\n}\n  ": types.CreateThreadDocument,
    "\nmutation EditThread($input: EditThreadInput!) {\n  editThread(input: $input) {\n    thread {\n      id\n      text\n      date\n    }\n  }\n}\n   ": types.EditThreadDocument,
    "\nsubscription OnThreadSent($messageId: String!) {\n  onThreadSent(messageId: $messageId) {\n    id\n    text\n    date\n    user {\n      username\n      fullName\n    }\n  }\n}\n  ": types.OnThreadSentDocument,
    "\nsubscription OnThreadDeleted($messageId: String!) {\n  onThreadDeleted(messageId: $messageId) {\n    id\n  }\n}\n        ": types.OnThreadDeletedDocument,
    "\nsubscription OnThreadUpdated($messageId: String!) {\n  onThreadUpdated(messageId: $messageId) {\n    id\n    text\n    date\n  }\n}\n  ": types.OnThreadUpdatedDocument,
    "\n  subscription OnMessageUpdatedTV($messageId: String!) {\n    onMessageUpdated(messageId: $messageId) {\n      id\n      text\n    }\n  }\n      ": types.OnMessageUpdatedTvDocument,
    "\n        subscription OnMessageDeletedTV($messageId: String!) {\n          onMessageDeleted(messageId: $messageId) {\n            id\n          }\n        }\n            ": types.OnMessageDeletedTvDocument,
    "\n    mutation UpdateWorkspace($input: UpdateWorkspaceInput!) {\n  updateWorkspace(input: $input) {\n    workspace {\n      id\n      name\n      createdBy\n    }\n  }\n}\n    ": types.UpdateWorkspaceDocument,
    "\n    mutation RemoveUserFromWorkspace($input: RemoveUserFromWorkspaceInput!) {\n  removeUserFromWorkspace(input: $input) {\n    workspace {\n      id\n      name\n      users {\n        fullName\n        username\n      }\n    }\n  }\n}\n    ": types.RemoveUserFromWorkspaceDocument,
    "\n    mutation DeleteWorkspace($input: DeleteWorkspaceInput!) {\n  deleteWorkspace(input: $input) {\n    workspace {\n      id\n    }\n  }\n}\n    ": types.DeleteWorkspaceDocument,
    "\n    query WorkspaceByIDJoin($workspaceId: UUID!, $username: String!) {\n  workspaceByID(workspaceID: $workspaceId, username: $username) {\n    name\n    users {\n      fullName\n      username\n    }\n  }\n}\n    ": types.WorkspaceByIdJoinDocument,
    "\n    mutation AddUserToWorkspaceJoin($input: AddUserToWorkspaceInput!) {\n  addUserToWorkspace(input: $input) {\n    workspace {\n      id\n    }\n  }\n}\n    ": types.AddUserToWorkspaceJoinDocument,
    "\n        mutation CreateUser($input: CreateUserInput!) {\n        createUser(input: $input) {\n            user {\n            username\n            fullName\n            email\n            }\n        }\n        }\n    ": types.CreateUserDocument,
    "\n  query UserData($username: String!) {\nuserByUsername(username: $username) {\n  username\n  fullName\n  email\n  workspaces {\n    id\n    name\n    createdBy\n  }\n}\n}\n  ": types.UserDataDocument,
    "\nquery WorkspaceByID($workspaceId: UUID!, $username: String!) {\n  workspaceByID(workspaceID: $workspaceId, username: $username) {\n    id\n    name\n    createdBy\n    users {\n      fullName\n      username\n    }\n    channels {\n      id\n      name\n      type\n      users {\n        username\n        fullName\n      }\n      messages {\n        id\n        text\n        date\n   \n        user {\n          username\n          fullName\n        }     \n        threads {\n          id\n          text\n          date\n          user {\n            username\n            fullName\n          }\n        }\n      }\n    }\n  }\n}\n  ": types.WorkspaceByIdDocument,
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
export function gql(source: "\n    mutation AddUserToChannelWM($input: AddUserToChannelInput!) {\n  addUserToChannel(input: $input) {\n    channel {\n      id\n      name\n      type\n      users {\n        fullName\n        username\n      }\n    }\n  }\n}\n    "): (typeof documents)["\n    mutation AddUserToChannelWM($input: AddUserToChannelInput!) {\n  addUserToChannel(input: $input) {\n    channel {\n      id\n      name\n      type\n      users {\n        fullName\n        username\n      }\n    }\n  }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation RemoveUserFromChannel($input: RemoveUserFromChannelInput!) {\n  removeUserFromChannel(input: $input) {\n    channel {\n      id\n      name\n      type\n      users {\n        fullName\n        username\n      }\n    }\n  }\n}"): (typeof documents)["\n    mutation RemoveUserFromChannel($input: RemoveUserFromChannelInput!) {\n  removeUserFromChannel(input: $input) {\n    channel {\n      id\n      name\n      type\n      users {\n        fullName\n        username\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateUser($input: UpdateUserInput!) {\n  updateUser(input: $input) {\n    user {\n      username\n    }\n  }\n}\n    "): (typeof documents)["\n    mutation UpdateUser($input: UpdateUserInput!) {\n  updateUser(input: $input) {\n    user {\n      username\n    }\n  }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteUser($input: DeleteUserInput!) {\n  deleteUser(input: $input) {\n    user {\n      username\n    }\n  }\n}\n    "): (typeof documents)["\n    mutation DeleteUser($input: DeleteUserInput!) {\n  deleteUser(input: $input) {\n    user {\n      username\n    }\n  }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query UserByEmailAU($email: String!) {\n  userByEmail(email: $email) {\n    username\n    fullName\n  }\n}\n  "): (typeof documents)["\n  query UserByEmailAU($email: String!) {\n  userByEmail(email: $email) {\n    username\n    fullName\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation AddUserToWorkspace($input: AddUserToWorkspaceInput!) {\n  addUserToWorkspace(input: $input) {\n    workspace {\n      id\n    }\n  }\n}\n    "): (typeof documents)["\n    mutation AddUserToWorkspace($input: AddUserToWorkspaceInput!) {\n  addUserToWorkspace(input: $input) {\n    workspace {\n      id\n    }\n  }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nsubscription OnMessageSent($channelId: String!) {\n  onMessageSent(channelId: $channelId) {\n    id\n    text\n    date\n    user {\n      username\n      fullName\n    }\n  }\n}\n    "): (typeof documents)["\nsubscription OnMessageSent($channelId: String!) {\n  onMessageSent(channelId: $channelId) {\n    id\n    text\n    date\n    user {\n      username\n      fullName\n    }\n  }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateChannelName($input: UpdateChannelNameInput!) {\n  updateChannelName(input: $input) {\n    channel {\n      id\n      name\n    }\n  }\n}\n    "): (typeof documents)["\n    mutation UpdateChannelName($input: UpdateChannelNameInput!) {\n  updateChannelName(input: $input) {\n    channel {\n      id\n      name\n    }\n  }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        mutation DeleteChannel($input: DeleteChannelInput!) {\n  deleteChannel(input: $input) {\n    channel {\n      id\n      name\n    }\n  }\n}\n        "): (typeof documents)["\n        mutation DeleteChannel($input: DeleteChannelInput!) {\n  deleteChannel(input: $input) {\n    channel {\n      id\n      name\n    }\n  }\n}\n        "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateChannelDM($input: CreateChannelInput!) {\n  createChannel(input: $input) {\n    channel {\n      id\n      name\n      type\n      users {\n        fullName\n        username\n      }\n    }\n  }\n}\n    "): (typeof documents)["\n    mutation CreateChannelDM($input: CreateChannelInput!) {\n  createChannel(input: $input) {\n    channel {\n      id\n      name\n      type\n      users {\n        fullName\n        username\n      }\n    }\n  }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nsubscription OnDMChannelCreated($workspaceId: String!, $rootUsername: String!, $directUsername: String!) {\n  onDMChannelCreated(workspaceId: $workspaceId, rootUsername: $rootUsername, directUsername: $directUsername) {\n    id\n    name\n    type\n  }\n}\n    "): (typeof documents)["\nsubscription OnDMChannelCreated($workspaceId: String!, $rootUsername: String!, $directUsername: String!) {\n  onDMChannelCreated(workspaceId: $workspaceId, rootUsername: $rootUsername, directUsername: $directUsername) {\n    id\n    name\n    type\n  }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateChannel($input: CreateChannelInput!) {\n  createChannel(input: $input) {\n    channel {\n      id\n      name\n      type\n    }\n  }\n}\n    "): (typeof documents)["\n    mutation CreateChannel($input: CreateChannelInput!) {\n  createChannel(input: $input) {\n    channel {\n      id\n      name\n      type\n    }\n  }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation AddUserToChannel($input: AddUserToChannelInput!) {\n  addUserToChannel(input: $input) {\n    channel {\n      id\n      name\n      type\n      users {\n        fullName\n        username\n      }\n    }\n  }\n}\n  "): (typeof documents)["\nmutation AddUserToChannel($input: AddUserToChannelInput!) {\n  addUserToChannel(input: $input) {\n    channel {\n      id\n      name\n      type\n      users {\n        fullName\n        username\n      }\n    }\n  }\n}\n  "];
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
export function gql(source: "\nsubscription OnMessageDeleted($messageId: String!) {\n  onMessageDeleted(messageId: $messageId) {\n    id\n  }\n}\n    "): (typeof documents)["\nsubscription OnMessageDeleted($messageId: String!) {\n  onMessageDeleted(messageId: $messageId) {\n    id\n  }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nsubscription OnMessageUpdated($messageId: String!) {\n  onMessageUpdated(messageId: $messageId) {\n    id\n    text\n  }\n}\n    "): (typeof documents)["\nsubscription OnMessageUpdated($messageId: String!) {\n  onMessageUpdated(messageId: $messageId) {\n    id\n    text\n  }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nsubscription OnThreadSentMessageBox($messageId: String!) {\n  onThreadSent(messageId: $messageId) {\n    id\n    text\n    date\n    user {\n      username\n      fullName\n    }\n  }\n}\n  "): (typeof documents)["\nsubscription OnThreadSentMessageBox($messageId: String!) {\n  onThreadSent(messageId: $messageId) {\n    id\n    text\n    date\n    user {\n      username\n      fullName\n    }\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription OnThreadDeletedMessageBox($messageId: String!) {\n    onThreadDeleted(messageId: $messageId) {\n      id\n      text\n      date\n    }\n  }\n        "): (typeof documents)["\n  subscription OnThreadDeletedMessageBox($messageId: String!) {\n    onThreadDeleted(messageId: $messageId) {\n      id\n      text\n      date\n    }\n  }\n        "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription OnThreadUpdatedMessageBox($messageId: String!) {\n  onThreadUpdated(messageId: $messageId) {\n    id\n    text\n    date\n  }\n}\n  "): (typeof documents)["\n  subscription OnThreadUpdatedMessageBox($messageId: String!) {\n  onThreadUpdated(messageId: $messageId) {\n    id\n    text\n    date\n  }\n}\n  "];
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
export function gql(source: "\nmutation CreateThread($input: CreateThreadInput!) {\n  createThread(input: $input) {\n    thread {\n      id\n      text\n      date\n      user {\n          username\n          fullName\n        }\n    }\n  }\n}\n  "): (typeof documents)["\nmutation CreateThread($input: CreateThreadInput!) {\n  createThread(input: $input) {\n    thread {\n      id\n      text\n      date\n      user {\n          username\n          fullName\n        }\n    }\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation EditThread($input: EditThreadInput!) {\n  editThread(input: $input) {\n    thread {\n      id\n      text\n      date\n    }\n  }\n}\n   "): (typeof documents)["\nmutation EditThread($input: EditThreadInput!) {\n  editThread(input: $input) {\n    thread {\n      id\n      text\n      date\n    }\n  }\n}\n   "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nsubscription OnThreadSent($messageId: String!) {\n  onThreadSent(messageId: $messageId) {\n    id\n    text\n    date\n    user {\n      username\n      fullName\n    }\n  }\n}\n  "): (typeof documents)["\nsubscription OnThreadSent($messageId: String!) {\n  onThreadSent(messageId: $messageId) {\n    id\n    text\n    date\n    user {\n      username\n      fullName\n    }\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nsubscription OnThreadDeleted($messageId: String!) {\n  onThreadDeleted(messageId: $messageId) {\n    id\n  }\n}\n        "): (typeof documents)["\nsubscription OnThreadDeleted($messageId: String!) {\n  onThreadDeleted(messageId: $messageId) {\n    id\n  }\n}\n        "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nsubscription OnThreadUpdated($messageId: String!) {\n  onThreadUpdated(messageId: $messageId) {\n    id\n    text\n    date\n  }\n}\n  "): (typeof documents)["\nsubscription OnThreadUpdated($messageId: String!) {\n  onThreadUpdated(messageId: $messageId) {\n    id\n    text\n    date\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription OnMessageUpdatedTV($messageId: String!) {\n    onMessageUpdated(messageId: $messageId) {\n      id\n      text\n    }\n  }\n      "): (typeof documents)["\n  subscription OnMessageUpdatedTV($messageId: String!) {\n    onMessageUpdated(messageId: $messageId) {\n      id\n      text\n    }\n  }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        subscription OnMessageDeletedTV($messageId: String!) {\n          onMessageDeleted(messageId: $messageId) {\n            id\n          }\n        }\n            "): (typeof documents)["\n        subscription OnMessageDeletedTV($messageId: String!) {\n          onMessageDeleted(messageId: $messageId) {\n            id\n          }\n        }\n            "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateWorkspace($input: UpdateWorkspaceInput!) {\n  updateWorkspace(input: $input) {\n    workspace {\n      id\n      name\n      createdBy\n    }\n  }\n}\n    "): (typeof documents)["\n    mutation UpdateWorkspace($input: UpdateWorkspaceInput!) {\n  updateWorkspace(input: $input) {\n    workspace {\n      id\n      name\n      createdBy\n    }\n  }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation RemoveUserFromWorkspace($input: RemoveUserFromWorkspaceInput!) {\n  removeUserFromWorkspace(input: $input) {\n    workspace {\n      id\n      name\n      users {\n        fullName\n        username\n      }\n    }\n  }\n}\n    "): (typeof documents)["\n    mutation RemoveUserFromWorkspace($input: RemoveUserFromWorkspaceInput!) {\n  removeUserFromWorkspace(input: $input) {\n    workspace {\n      id\n      name\n      users {\n        fullName\n        username\n      }\n    }\n  }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteWorkspace($input: DeleteWorkspaceInput!) {\n  deleteWorkspace(input: $input) {\n    workspace {\n      id\n    }\n  }\n}\n    "): (typeof documents)["\n    mutation DeleteWorkspace($input: DeleteWorkspaceInput!) {\n  deleteWorkspace(input: $input) {\n    workspace {\n      id\n    }\n  }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query WorkspaceByIDJoin($workspaceId: UUID!, $username: String!) {\n  workspaceByID(workspaceID: $workspaceId, username: $username) {\n    name\n    users {\n      fullName\n      username\n    }\n  }\n}\n    "): (typeof documents)["\n    query WorkspaceByIDJoin($workspaceId: UUID!, $username: String!) {\n  workspaceByID(workspaceID: $workspaceId, username: $username) {\n    name\n    users {\n      fullName\n      username\n    }\n  }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation AddUserToWorkspaceJoin($input: AddUserToWorkspaceInput!) {\n  addUserToWorkspace(input: $input) {\n    workspace {\n      id\n    }\n  }\n}\n    "): (typeof documents)["\n    mutation AddUserToWorkspaceJoin($input: AddUserToWorkspaceInput!) {\n  addUserToWorkspace(input: $input) {\n    workspace {\n      id\n    }\n  }\n}\n    "];
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
export function gql(source: "\nquery WorkspaceByID($workspaceId: UUID!, $username: String!) {\n  workspaceByID(workspaceID: $workspaceId, username: $username) {\n    id\n    name\n    createdBy\n    users {\n      fullName\n      username\n    }\n    channels {\n      id\n      name\n      type\n      users {\n        username\n        fullName\n      }\n      messages {\n        id\n        text\n        date\n   \n        user {\n          username\n          fullName\n        }     \n        threads {\n          id\n          text\n          date\n          user {\n            username\n            fullName\n          }\n        }\n      }\n    }\n  }\n}\n  "): (typeof documents)["\nquery WorkspaceByID($workspaceId: UUID!, $username: String!) {\n  workspaceByID(workspaceID: $workspaceId, username: $username) {\n    id\n    name\n    createdBy\n    users {\n      fullName\n      username\n    }\n    channels {\n      id\n      name\n      type\n      users {\n        username\n        fullName\n      }\n      messages {\n        id\n        text\n        date\n   \n        user {\n          username\n          fullName\n        }     \n        threads {\n          id\n          text\n          date\n          user {\n            username\n            fullName\n          }\n        }\n      }\n    }\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query UserByUsername($username: String!) {\n  userByUsername(username: $username) {\n    username\n    fullName\n    email\n    workspaces {\n      id\n      name\n    }\n  }\n}\n  "): (typeof documents)["\n  query UserByUsername($username: String!) {\n  userByUsername(username: $username) {\n    username\n    fullName\n    email\n    workspaces {\n      id\n      name\n    }\n  }\n}\n  "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;