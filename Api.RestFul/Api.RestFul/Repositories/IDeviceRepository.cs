using Api.RestFul.Dto;
using Api.RestFul.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.RestFul.Repositories
{
    public interface IDeviceRepository : IEntityRepository<Device>
    {
        Task<List<Device>> FilterLocParConAsync(int location, int parentLocation, bool connected);
        Task<List<Device>> GetAllConnected();
        Task<List<Device>> GetAllDevices();
        Task<List<Device>> GetAllConected();
        Task<List<Device>> GetAlldisConected();
        Task<List<Device>> GetLocationParentLocation(int loc_parLoc);
        Task<Device> Add(DeviceDto device);
        Task<bool> Edit(DeviceDto device);
    }
}