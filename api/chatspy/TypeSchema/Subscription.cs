using HotChocolate.Execution;
using HotChocolate.Subscriptions;

namespace chatspy.TypeSchema;

public class Subscription
{
    public async ValueTask<ISourceStream<Channel>> OnDMChannelCreatedReceiver(
        string workspaceId,
        string rootUsername,
        string directUsername,
        [Service] ITopicEventReceiver receiver
    ) =>
        await receiver.SubscribeAsync<Channel>(
            $"[NEW_DM]{workspaceId}-{rootUsername}-{directUsername}"
        );

    [GraphQLDescription("Is triggered when a new DM channel is created.")]
    [Subscribe(With = nameof(OnDMChannelCreatedReceiver))]
    public Channel OnDMChannelCreated([EventMessage] Channel createdDmChannel) => createdDmChannel;

    public async ValueTask<ISourceStream<Message>> OnMessageSentReceiver(
        string ChannelId,
        [Service] ITopicEventReceiver receiver
    ) => await receiver.SubscribeAsync<Message>($"[LISTEN_FOR_MESSAGE]{ChannelId}");

    [GraphQLDescription("Is triggered when a new message is created.")]
    [Subscribe(With = nameof(OnMessageSentReceiver))]
    public Message OnMessageSent([EventMessage] Message createdMessage) => createdMessage;

    public async ValueTask<ISourceStream<Message>> OnMessageEditedReceiver(
        string MessageId,
        [Service] ITopicEventReceiver receiver
    ) => await receiver.SubscribeAsync<Message>($"[EDIT_MESSAGE]{MessageId}");

    [GraphQLDescription("Is triggered when a new message is edited.")]
    [Subscribe(With = nameof(OnMessageEditedReceiver))]
    public Message OnMessageUpdated([EventMessage] Message updatedMessage) => updatedMessage;

    public async ValueTask<ISourceStream<Message>> OnMessageDeletedReceiver(
        string MessageId,
        [Service] ITopicEventReceiver receiver
    ) => await receiver.SubscribeAsync<Message>($"[DELETE_MESSAGE]{MessageId}");

    [GraphQLDescription("Is triggered when a new message is deleted.")]
    [Subscribe(With = nameof(OnMessageDeletedReceiver))]
    public Message OnMessageDeleted([EventMessage] Message deletedMessage) => deletedMessage;

    public async ValueTask<ISourceStream<Thread>> OnThreadSentReceiver(
        string MessageId,
        [Service] ITopicEventReceiver receiver
    ) => await receiver.SubscribeAsync<Thread>($"[CREATE_THREAD]{MessageId}");

    [GraphQLDescription("Is triggered when a new thread is created.")]
    [Subscribe(With = nameof(OnThreadSentReceiver))]
    public Thread OnThreadSent([EventMessage] Thread createdThread) => createdThread;

    public async ValueTask<ISourceStream<Thread>> OnThreadUpdatedReceiver(
        string MessageId,
        [Service] ITopicEventReceiver receiver
    ) => await receiver.SubscribeAsync<Thread>($"[EDIT_THREAD]{MessageId}");

    [GraphQLDescription("Is triggered when a new thread is edited.")]
    [Subscribe(With = nameof(OnThreadUpdatedReceiver))]
    public Thread OnThreadUpdated([EventMessage] Thread updatedThread) => updatedThread;

    public async ValueTask<ISourceStream<Thread>> OnThreadDeletedReceiver(
        string MessageId,
        [Service] ITopicEventReceiver receiver
    ) => await receiver.SubscribeAsync<Thread>($"[DELETE_THREAD]{MessageId}");

    [GraphQLDescription("Is triggered when a new thread is deleted.")]
    [Subscribe(With = nameof(OnThreadDeletedReceiver))]
    public Thread OnThreadDeleted([EventMessage] Thread deletedThread) => deletedThread;
}
