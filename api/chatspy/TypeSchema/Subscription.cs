using System;

namespace chatspy.TypeSchema;

public class Subscription
{
    [Subscribe]
    [Topic($"{{{nameof(channelId)}}}")]
    public Message OnMessageSent(Guid channelId, [EventMessage] Message createdMessage) =>
        createdMessage;

    [Subscribe]
    [Topic($"{{{nameof(messageId)}}}")]
    public Message OnMessageUpdated(Guid messageId, [EventMessage] Message updatedMessage) =>
        updatedMessage;

    [Subscribe]
    [Topic($"{{{nameof(messageId)}}}")]
    public Message OnMessageDeleted(Guid messageId, [EventMessage] Message deletedMessage) =>
        deletedMessage;
}
