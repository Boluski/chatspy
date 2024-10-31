using chatspy.Data;
using chatspy.TypeSchema;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var serverVersion = new MySqlServerVersion(new Version(8, 0, 29));

var configuration = builder.Configuration;
var connectionString = configuration["CONNECTION_STRING"];

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
    .RegisterDbContext<ChatspyContext>(DbContextKind.Synchronized)
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddSubscriptionType<Subscription>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder
            .WithOrigins(
                "https://studio.apollographql.com",
                "http://localhost:3000",
                "https://dev.d3snqv7mkpyhje.amplifyapp.com",
                "https://main.d3snqv7mkpyhje.amplifyapp.com"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors();

app.UseWebSockets();

app.MapGraphQL();

app.Run();
