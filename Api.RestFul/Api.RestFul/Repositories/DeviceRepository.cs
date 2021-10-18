using Api.RestFul.Dto;
using Api.RestFul.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.RestFul.Repositories
{
    public class DeviceRepository : EntityRepository<Device>, IDeviceRepository
    {

        private readonly TestDevicesContext _testDevicesContext;
        private readonly IMapper _mapper;

        public DeviceRepository(TestDevicesContext testDevicesContext, IMapper mapper) : base(testDevicesContext)
        {
            _testDevicesContext = testDevicesContext;
            _mapper = mapper;
        }

        public Task<List<Device>> FilterLocParConAsync(int location, int parentLocation, bool connected) =>
            _testDevicesContext.Devices
                .AsNoTracking()
                .Where(p =>
                p.Location.Equals(location) ||
                p.ParentLocation.Equals(parentLocation) ||
                p.Connected.Equals(connected)
                ).ToListAsync();

        public async Task<List<Device>> GetAllConnected()
        {
            var result = _testDevicesContext.Devices.Where(x => x.Connected).ToList();
            return await Task.FromResult(result);
        }
        public async Task<List<Device>> GetAllDevices()
        {
            var result = _testDevicesContext.Devices.ToList();
            return await Task.FromResult(result);
        }


        public async Task<List<Device>> GetAllConected()
        {
            var result = await _testDevicesContext.Devices.AsNoTracking().Where(dev => dev.Connected).ToListAsync();
            return await Task.FromResult(result);
        }
        public async Task<List<Device>> GetAlldisConected()
        {
            var result = await _testDevicesContext.Devices.AsNoTracking().Where(dev => !dev.Connected).ToListAsync();
            return await Task.FromResult(result);
        }
        public async Task<List<Device>> GetLocationParentLocation(int loc_parLoc)
        {
            var result = await _testDevicesContext.Devices.AsNoTracking().Where(dev => dev.Location.Equals(loc_parLoc) || dev.ParentLocation.Equals(loc_parLoc)).ToListAsync();
            return await Task.FromResult(result);
        }


        public async Task<Device> Add(DeviceDto device)
        {
            var deviceEnt = _mapper.Map<Device>(device);
            deviceEnt.Id = Guid.NewGuid().ToString();
            await _testDevicesContext.Devices.AddAsync(deviceEnt);
            await _testDevicesContext.SaveChangesAsync();
            return deviceEnt;
        }

        public async Task<bool> Edit(DeviceDto device)
        {
            var deviceEnt = await _testDevicesContext.Devices.SingleOrDefaultAsync(dev => dev.Id == device.Id);

            if (deviceEnt == null)
                throw new Exception("No Ent Was Found");


            deviceEnt.Connected = device.Connected;
            deviceEnt.Location = device.Location;
            deviceEnt.ParentLocation = device.ParentLocation;
            deviceEnt.MacAddress = device.MacAddress;
            deviceEnt.Signal = device.Signal;
            deviceEnt.UpdatedAt = DateTime.Now;

            _testDevicesContext.Devices.Update(deviceEnt);

            return (await _testDevicesContext.SaveChangesAsync()) > 0;
        }

    }
}
