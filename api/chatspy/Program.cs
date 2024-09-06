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
    .AddDefaultTransactionScopeHandler()
    // .AddMutationConventions()
    .RegisterDbContext<ChatspyContext>()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>();

// builder.Services.AddGraphQLServer().AddQueryType<Query>();

var app = builder.Build();

app.MapGraphQL();

app.Run();
