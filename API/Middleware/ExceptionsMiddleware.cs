using System.Net;
using System.Text.Json;
using API.Errors;

namespace API.Middleware
{
    public class ExceptionsMiddleware
    {
        //RequestDelegate its whats next coming in from the pipeline
        //ILogger if for display purposes in console
        //IHostEnvironment to check in what env we in
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionsMiddleware> _logger;
        private readonly IHostEnvironment _env;
        public ExceptionsMiddleware(RequestDelegate next, ILogger<ExceptionsMiddleware> logger, IHostEnvironment env)
        {
            this._env = env;
            this._logger = logger;
            this._next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.ToString());
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var response = _env.IsDevelopment()
                    ? new ApiExceptions(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString()) //for development mode
                    : new ApiExceptions(context.Response.StatusCode, "InternalServerError", "");            //for production mode

                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                var json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);    
            }
        }
    }
}