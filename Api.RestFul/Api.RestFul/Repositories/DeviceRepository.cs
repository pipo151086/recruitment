using Api.RestFul.Models;
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
        public DeviceRepository(TestDevicesContext testDevicesContext) : base(testDevicesContext)
        {
            _testDevicesContext = testDevicesContext;
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
    }
}
