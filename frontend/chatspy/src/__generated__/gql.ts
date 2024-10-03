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
    "\n    mutation CreateChannel($input: CreateChannelInput!) {\n  createChannel(input: $input) {\n    channel {\n      id\n      name\n      type\n    }\n  }\n}\n    ": types.CreateChannelDocument,
    "\nmutation CreateWorkspace($input: CreateWorkspaceInput!) {\n  createWorkspace(input: $input) {\n    workspace {\n      id\n      name\n    }\n  }\n}\n    ": types.CreateWorkspaceDocument,
    "\nmutation Mutation($input: CreateMessageInput!) {\n    createMessage(input: $input) {\n      message {\n        id\n        text\n        date\n        user {\n          username\n          fullName\n        }\n      }\n    }\n  }": types.MutationDocument,
    "\n        mutation CreateUser($input: CreateUserInput!) {\n        createUser(input: $input) {\n            user {\n            username\n            fullName\n            email\n            }\n        }\n        }\n    ": types.CreateUserDocument,
    "\n  query UserData($username: String!) {\nuserByUsername(username: $username) {\n  username\n  fullName\n  email\n  workspaces {\n    id\n    name\n    createdBy\n  }\n}\n}\n  ": types.UserDataDocument,
    "\nquery WorkspaceByID($workspaceId: UUID!, $username: String!) {\nworkspaceByID(workspaceID: $workspaceId, username: $username) {\n  id\n  name\n  createdBy\n  channels {\n        id\n        name\n        type\n        messages {\n          id\n          text\n          date\n          user {\n            fullName\n            username\n          }\n        }\n      }\n}\n}\n  ": types.WorkspaceByIdDocument,
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
export function gql(source: "\n    mutation CreateChannel($input: CreateChannelInput!) {\n  createChannel(input: $input) {\n    channel {\n      id\n      name\n      type\n    }\n  }\n}\n    "): (typeof documents)["\n    mutation CreateChannel($input: CreateChannelInput!) {\n  createChannel(input: $input) {\n    channel {\n      id\n      name\n      type\n    }\n  }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateWorkspace($input: CreateWorkspaceInput!) {\n  createWorkspace(input: $input) {\n    workspace {\n      id\n      name\n    }\n  }\n}\n    "): (typeof documents)["\nmutation CreateWorkspace($input: CreateWorkspaceInput!) {\n  createWorkspace(input: $input) {\n    workspace {\n      id\n      name\n    }\n  }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation Mutation($input: CreateMessageInput!) {\n    createMessage(input: $input) {\n      message {\n        id\n        text\n        date\n        user {\n          username\n          fullName\n        }\n      }\n    }\n  }"): (typeof documents)["\nmutation Mutation($input: CreateMessageInput!) {\n    createMessage(input: $input) {\n      message {\n        id\n        text\n        date\n        user {\n          username\n          fullName\n        }\n      }\n    }\n  }"];
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
export function gql(source: "\nquery WorkspaceByID($workspaceId: UUID!, $username: String!) {\nworkspaceByID(workspaceID: $workspaceId, username: $username) {\n  id\n  name\n  createdBy\n  channels {\n        id\n        name\n        type\n        messages {\n          id\n          text\n          date\n          user {\n            fullName\n            username\n          }\n        }\n      }\n}\n}\n  "): (typeof documents)["\nquery WorkspaceByID($workspaceId: UUID!, $username: String!) {\nworkspaceByID(workspaceID: $workspaceId, username: $username) {\n  id\n  name\n  createdBy\n  channels {\n        id\n        name\n        type\n        messages {\n          id\n          text\n          date\n          user {\n            fullName\n            username\n          }\n        }\n      }\n}\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query UserByUsername($username: String!) {\n  userByUsername(username: $username) {\n    username\n    fullName\n    email\n    workspaces {\n      id\n      name\n    }\n  }\n}\n  "): (typeof documents)["\n  query UserByUsername($username: String!) {\n  userByUsername(username: $username) {\n    username\n    fullName\n    email\n    workspaces {\n      id\n      name\n    }\n  }\n}\n  "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;