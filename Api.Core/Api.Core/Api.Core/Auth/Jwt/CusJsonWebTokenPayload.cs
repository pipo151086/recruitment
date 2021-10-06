using System;
using System.Collections.Generic;
using System.Text;

namespace Api.Core.Auth.Jwt
{
    public class CusJsonWebTokenPayload
    {
        public string Subject { get; set; }
        public string Role { get; set; }
        public long Expires { get; set; }
        public IDictionary<string, string> Claims { get; set; }
    }
}
