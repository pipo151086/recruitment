using Api.RestFul.Dto;
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

        public async Task<List<Device>> GetConected()
        {

            var filterResult = await _deviceRepository.GetAllConected();
            var deviceList = filterResult.ToList();
            return deviceList;
        }


        public async Task<List<Device>> GetAlldisConected()
        {

            var filterResult = await _deviceRepository.GetAlldisConected();
            var deviceList = filterResult.ToList();
            return deviceList;
        }

        public async Task<List<Device>> GetLocationParentLocation(int loc_parLoc)
        {

            var filterResult = await _deviceRepository.GetLocationParentLocation(loc_parLoc);
            var deviceList = filterResult.ToList();
            return deviceList;
        }

        public async Task<Device> Add(DeviceDto device)
        {
            var dev = await _deviceRepository.Add(device);
            return dev;
        }


        public async Task<bool> Edit(DeviceDto device)
        {
            var dev = await _deviceRepository.Edit(device);
            return dev;
        }

    }
}
