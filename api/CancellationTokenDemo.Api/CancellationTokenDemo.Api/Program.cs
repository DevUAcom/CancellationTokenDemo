var builder = WebApplication.CreateBuilder(args);
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Services.AddCors(options =>
{
    options.AddPolicy("local", policy => policy.WithOrigins("http://localhost:4200"));
});

var app = builder.Build();

app.UseCors("local");

app.MapGet("/report/{period}", async (string period, CancellationToken ct) =>
    {
        try
        {
            await Task.Delay(TimeSpan.FromSeconds(5), ct);
            return Results.Ok($"{period} report");
        }
        catch (TaskCanceledException e)
        {
            Console.WriteLine(e);
            Console.WriteLine("Operation has been canceled.");
            return Results.Empty;
        }
    })
    ;

app.Run();

