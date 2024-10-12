using System;
using System.Diagnostics;
using HotChocolate.Execution;
using HotChocolate.Subscriptions;
using Microsoft.AspNetCore.Http.HttpResults;

namespace chatspy.TypeSchema;

public class Subscription
{
    // OnMessageSent
    public async ValueTask<ISourceStream<Message>> OnMessageSentReceiver(
        string ChannelId,
        [Service] ITopicEventReceiver receiver
    ) => await receiver.SubscribeAsync<Message>($"[LISTEN_FOR_MESSAGE]{ChannelId}");

    [GraphQLDescription("Is triggered when a new message is created.")]
    [Subscribe(With = nameof(OnMessageSentReceiver))]
    public Message OnMessageSent([EventMessage] Message createdMessage) => createdMessage;

    // OnMessageEdited
    public async ValueTask<ISourceStream<Message>> OnMessageEditedReceiver(
        string MessageId,
        [Service] ITopicEventReceiver receiver
    ) => await receiver.SubscribeAsync<Message>($"[EDIT_MESSAGE]{MessageId}");

    [GraphQLDescription("Is triggered when a new message is edited.")]
    [Subscribe(With = nameof(OnMessageEditedReceiver))]
    public Message OnMessageUpdated([EventMessage] Message updatedMessage) => updatedMessage;

    // OnMessageDeleted
    public async ValueTask<ISourceStream<Message>> OnMessageDeletedReceiver(
        string MessageId,
        [Service] ITopicEventReceiver receiver
    ) => await receiver.SubscribeAsync<Message>($"[DELETE_MESSAGE]{MessageId}");

    [GraphQLDescription("Is triggered when a new message is deleted.")]
    [Subscribe(With = nameof(OnMessageDeletedReceiver))]
    public Message OnMessageDeleted([EventMessage] Message deletedMessage) => deletedMessage;

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
