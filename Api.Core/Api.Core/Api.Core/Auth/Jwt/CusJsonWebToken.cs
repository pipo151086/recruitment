using System;
using System.Collections.Generic;
using System.Text;

namespace Api.Core.Auth.Jwt
{
    public class CusJsonWebToken
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public long Expires { get; set; }
        public string Id { get; set; }
        public string Role { get; set; }
        public IDictionary<string, string> Claims { get; set; }
    }
}
