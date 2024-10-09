using System;
using System.Diagnostics;
using Microsoft.AspNetCore.Http.HttpResults;

namespace chatspy.TypeSchema;

public class Subscription
{
    [GraphQLDescription("Is triggered when a new message is created.")]
    [Subscribe]
    [Topic($"{{{nameof(channelId)}}}")]
    public Message OnMessageSent(Guid channelId, [EventMessage] Message createdMessage) =>
        createdMessage;

    [GraphQLDescription("Is triggered when a new message is edited.")]
    [Subscribe]
    [Topic($"{{{nameof(messageTopic)}}}")]
    public Message OnMessageUpdated(string messageTopic, [EventMessage] Message updatedMessage) =>
        updatedMessage;

    [GraphQLDescription("Is triggered when a new message is deleted.")]
    [Subscribe]
    [Topic($"{{{nameof(messageTopic)}}}")]
    public Message OnMessageDeleted(string messageTopic, [EventMessage] Message deletedMessage) =>
        deletedMessage;

    [GraphQLDescription("Is triggered when a new thread is created.")]
    [Subscribe]
    [Topic($"{{{nameof(messageId)}}}")]
    public Thread OnThreadSent(Guid messageId, [EventMessage] Thread createdThread) =>
        createdThread;

    [GraphQLDescription("Is triggered when a new thread is edited.")]
    [Subscribe]
    [Topic($"{{{nameof(threadId)}}}")]
    public Thread OnThreadUpdated(Guid threadId, [EventMessage] Thread updatedThread) =>
        updatedThread;

    [GraphQLDescription("Is triggered when a new thread is deleted.")]
    [Subscribe]
    [Topic($"{{{nameof(threadId)}}}")]
    public Thread OnThreadDeleted(Guid threadId, [EventMessage] Thread deletedMessage) =>
        deletedMessage;
}
