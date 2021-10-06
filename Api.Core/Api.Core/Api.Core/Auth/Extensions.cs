using Api.Core.Auth.Jwt;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Text;

namespace Api.Core.Auth
{
    public static class Extensions
    {
        public static string JwtSection = "jwt";
        public static void AddCusJwt(this IServiceCollection services)
        {
            IConfiguration configuration;
            using (var serviceProvider = services.BuildServiceProvider())
            {
                configuration = serviceProvider.GetService<IConfiguration>();
            }
            var section = configuration.GetSection(JwtSection);
            //var options = configuration.GetValue<JwtOptions>(JwtSection);
            var options = configuration.GetSection(JwtSection).Get<JwtOptions>(); ;

            services.Configure<JwtOptions>(section);
            services.AddSingleton(options);
            services.AddTransient<IAccessTokenService, AccessTokenService>();
            services.AddSingleton<IJwtHandler, JwtHandler>();
            
            services.AddTransient<AccessTokenValidatorMiddleware>();
            services.AddAuthentication()
                .AddJwtBearer(cfg =>
                {
                    cfg.TokenValidationParameters = new TokenValidationParameters
                    {
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(options.SecretKey)),
                        ValidIssuer = options.Issuer,
                        ValidAudience = options.ValidAudience,
                        ValidateAudience = options.ValidateAudience,
                        ValidateLifetime = options.ValidateLifetime
                    };
                });


        }

        public static IApplicationBuilder UseAccessTokenValidator(this IApplicationBuilder app)
            => app.UseMiddleware<AccessTokenValidatorMiddleware>();

        public static long ToTimestamp(this DateTime dateTime)
        {
            var timeSpan = dateTime - new DateTime(1970, 1, 1, 0, 0, 0);
            return (long)timeSpan.TotalSeconds;
        }

    }
}
