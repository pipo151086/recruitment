using Api.Core.Auth.Jwt;
using Api.RestFul.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.RestFul.Services
{
    //This should be a diferent microService being routed from proxy server or a GateWay
    public class SecurityService : ISecurityService
    {
        private readonly IJwtHandler _jwtHandler;


        public SecurityService(IJwtHandler jwtHandler)
        {
            _jwtHandler = jwtHandler;
        }

        public async Task<Object> Login(LoginDto loginDto)
        {
            //Validate User
            var userId = 1;
            var role = "Seller";

            Dictionary<string, string> severalParamsToCreateClaims = new Dictionary<string, string>();
            severalParamsToCreateClaims.Add("Privileges", "[Sell,Buy]");


            var claims = await GenerateClaimsAsync(severalParamsToCreateClaims);
            var jwt = _jwtHandler.CreateToken(userId.ToString(), role, claims);

            var result = new
            {
                jwt = jwt,
                userId = userId,
                //More Valuable info from Validation Result
                userDocType = "Passport",
                userDocNumber = "123456789"
            };

            return result;
        }
        private async Task<IDictionary<string, string>> GenerateClaimsAsync(Dictionary<string, string> severalParamsToCreateClaims)
        {
            var claimsDictionary = await Task.FromResult(new Dictionary<string, string>());

            severalParamsToCreateClaims.ToList().ForEach(el =>
            {
                claimsDictionary.Add(el.Key, el.Value);
            });

            return claimsDictionary;
        }
    }
}
