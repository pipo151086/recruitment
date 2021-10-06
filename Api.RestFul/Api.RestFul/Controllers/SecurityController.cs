using Api.RestFul.Dto;
using Api.RestFul.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.RestFul.Controllers
{
    //Important Info: 
    //
    //
    //This should be a diferent microService being routed from proxy server or a GateWay
    [ApiController]
    [Route("[controller]")]
    public class SecurityController : ControllerBase
    {
        private readonly ISecurityService _securityService;
        public SecurityController(ISecurityService securityService)
        {
            _securityService = securityService;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto) => Ok(await _securityService.Login(loginDto));
    }
}
