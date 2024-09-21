using chatspy.Data;
using chatspy.TypeSchema;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var serverVersion = new MySqlServerVersion(new Version(8, 0, 29));
var connectionString = "server=localhost;user=root;password=boluSKI080#;database=chatspy";

builder.Services.AddDbContext<ChatspyContext>(options =>
    options
        .UseMySql(connectionString, serverVersion)
        .LogTo(Console.WriteLine, LogLevel.Information)
        .EnableSensitiveDataLogging()
        .EnableDetailedErrors()
);

builder
    .Services.AddGraphQLServer()
    .AddInMemorySubscriptions()
    .AddDefaultTransactionScopeHandler()
    .AddMutationConventions(applyToAllMutations: true)
    .RegisterDbContext<ChatspyContext>()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddSubscriptionType<Subscription>();

// Enable Apollo Sandbox
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder
            .WithOrigins("https://studio.apollographql.com", "http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Enable Apollo Sandbox
app.UseCors();

app.UseWebSockets();

app.MapGraphQL();

app.Run();
