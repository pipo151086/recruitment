using Api.RestFul.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.RestFul.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DeviceController : ControllerBase
    {
        private readonly IDeviceService _deviceService;

        public DeviceController(IDeviceService deviceService)
        {
            _deviceService = deviceService;
        }

        [HttpGet]
        public IActionResult Get([FromQuery] string cmnd) => Ok($"{cmnd} HelloThere!!!!");


        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll() => Ok(await _deviceService.GetAll());

    }
}
