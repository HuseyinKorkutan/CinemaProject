using CinemaProject.Business.Abstract;
using CinemaProject.Business.Concrete;
using CinemaProject.Business.Mappings;
using CinemaProject.Business.Utilities.Security;
using CinemaProject.DataAccess.Abstract;
using CinemaProject.DataAccess.Concrete.EntityFramework;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Kestrel ayarlarını ekleyelim
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenAnyIP(5000); // HTTP için
    serverOptions.ListenAnyIP(5001, listenOptions =>
    {
        listenOptions.UseHttps(); // HTTPS için
    });
});

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// DbContext
builder.Services.AddDbContext<CinemaContext>();

// AutoMapper
builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

// Repositories
builder.Services.AddScoped<IMovieRepository, EfMovieRepository>();
builder.Services.AddScoped<IHallRepository, EfHallRepository>();
builder.Services.AddScoped<IScreeningRepository, EfScreeningRepository>();
builder.Services.AddScoped<ICustomerRepository, EfCustomerRepository>();
builder.Services.AddScoped<IReservationRepository, EfReservationRepository>();
builder.Services.AddScoped<IUserRepository, EfUserRepository>();

// Services
builder.Services.AddScoped<IMovieService, MovieManager>();
builder.Services.AddScoped<IHallService, HallManager>();
builder.Services.AddScoped<IScreeningService, ScreeningManager>();
builder.Services.AddScoped<ICustomerService, CustomerManager>();
builder.Services.AddScoped<IReservationService, ReservationManager>();

// JWT için gerekli servisleri ekleyelim
builder.Services.Configure<TokenOptions>(builder.Configuration.GetSection("TokenOptions"));
builder.Services.AddScoped<ITokenHelper, JwtHelper>();
builder.Services.AddScoped<IAuthService, AuthManager>();

// JWT authentication
var tokenOptions = builder.Configuration.GetSection("TokenOptions").Get<TokenOptions>();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidIssuer = tokenOptions.Issuer,
            ValidAudience = tokenOptions.Audience,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenOptions.SecurityKey)),
            ClockSkew = TimeSpan.Zero
        };

        options.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = context =>
            {
                if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                {
                    context.Response.Headers.Add("Token-Expired", "true");
                }
                return Task.CompletedTask;
            }
        };
    });

// CORS politikası
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

// Reservation dependencies
builder.Services.AddScoped<IReservationRepository, EfReservationRepository>();
builder.Services.AddScoped<IReservationService, ReservationManager>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection(); // Bunu kaldıralım veya yorum satırı yapalım

// CORS'u authentication'dan önce ekleyelim
app.UseCors("AllowAll");

// Authentication ve Authorization sırası önemli
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
