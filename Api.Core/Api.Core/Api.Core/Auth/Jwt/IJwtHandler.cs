using System.Collections.Generic;

namespace Api.Core.Auth.Jwt
{
    public interface IJwtHandler
    {
        CusJsonWebToken CreateToken(string userId, string role = null, IDictionary<string, string> claims = null);
        CusJsonWebTokenPayload GetTokenPayload(string accessToken);
    }
}