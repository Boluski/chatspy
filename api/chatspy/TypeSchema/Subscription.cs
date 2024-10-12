using System;
using System.Diagnostics;
using HotChocolate.Execution;
using HotChocolate.Subscriptions;
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

    // OnThreadCreated
    public async ValueTask<ISourceStream<Thread>> OnThreadSentReceiver(
        string MessageId,
        [Service] ITopicEventReceiver receiver
    ) => await receiver.SubscribeAsync<Thread>($"[CREATE_THREAD]{MessageId}");

    [GraphQLDescription("Is triggered when a new thread is created.")]
    [Subscribe(With = nameof(OnThreadSentReceiver))]
    public Thread OnThreadSent([EventMessage] Thread createdThread) => createdThread;

    // OnThreadEdited
    public async ValueTask<ISourceStream<Thread>> OnThreadUpdatedReceiver(
        string MessageId,
        [Service] ITopicEventReceiver receiver
    ) => await receiver.SubscribeAsync<Thread>($"[EDIT_THREAD]{MessageId}");

    [GraphQLDescription("Is triggered when a new thread is edited.")]
    [Subscribe(With = nameof(OnThreadUpdatedReceiver))]
    public Thread OnThreadUpdated([EventMessage] Thread updatedThread) => updatedThread;

    // OnThreadDeleted
    public async ValueTask<ISourceStream<Thread>> OnThreadDeletedReceiver(
        string MessageId,
        [Service] ITopicEventReceiver receiver
    ) => await receiver.SubscribeAsync<Thread>($"[DELETE_THREAD]{MessageId}");

    [GraphQLDescription("Is triggered when a new thread is deleted.")]
    [Subscribe(With = nameof(OnThreadDeletedReceiver))]
    public Thread OnThreadDeleted([EventMessage] Thread deletedThread) => deletedThread;
}
