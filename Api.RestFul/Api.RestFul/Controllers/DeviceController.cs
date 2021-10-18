using Api.RestFul.Dto;
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

        [HttpGet("GetConected")]
        public async Task<IActionResult> GetConected() => Ok(await _deviceService.GetConected());

        [HttpGet("GetDisconected")]
        public async Task<IActionResult> GetDisconected() => Ok(await _deviceService.GetAlldisConected());

        [HttpGet("GetLocationParentLocation")]
        public async Task<IActionResult> GetLocationParentLocation(int loc_parLoc) => Ok(await _deviceService.GetLocationParentLocation(loc_parLoc));

        [HttpPost("Add")]
        public async Task<IActionResult> Add(DeviceDto deviceDto) => Ok(await _deviceService.Add(deviceDto));

        [HttpPost("Edit")]
        public async Task<IActionResult> Edit(DeviceDto deviceDto) => Ok(await _deviceService.Edit(deviceDto));

    }
}
