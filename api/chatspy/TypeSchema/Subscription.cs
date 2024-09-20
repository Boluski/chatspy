using System;

namespace chatspy.TypeSchema;

public class Subscription
{
    [Subscribe]
    [Topic($"{{{nameof(channelId)}}}")]
    public Message OnMessageSent(Guid channelId, [EventMessage] Message createdMessage) =>
        createdMessage;

    // [Subscribe]
    // [Topic($"{{{nameof()}}}")]
    // public Message OnMessageUpdated([EventMessage] Message updatedMessage) => updatedMessage;
}
