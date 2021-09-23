using Api.RestFul.Models;
using Api.RestFul.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.RestFul.Services
{

    public class DeviceService : IDeviceService
    {

        private readonly IDeviceRepository _deviceRepository;

        public DeviceService(IDeviceRepository deviceRepository)
        {
            _deviceRepository = deviceRepository;
        }


        public Task<List<Device>> FilterLocParConAsync(int location, int parentLocation, bool connected)
        {
            var filterResult = _deviceRepository.FilterLocParConAsync(location, parentLocation, connected);
            return filterResult;
        }

        public async Task<List<Device>> GetAll()
        {

            var filterResult = await _deviceRepository.GetAllDevices();
            var deviceList = filterResult.ToList();
            return deviceList;
        }
    }
}
