using Api.RestFul.Dto;
using Api.RestFul.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.RestFul.Services
{
    public interface IDeviceService
    {
        Task<Device> Add(DeviceDto device);
        Task<bool> Edit(DeviceDto device);
        Task<List<Device>> FilterLocParConAsync(int location, int parentLocation, bool connected);
        Task<List<Device>> GetAll();
        Task<List<Device>> GetAlldisConected();
        Task<List<Device>> GetConected();
        Task<List<Device>> GetLocationParentLocation(int loc_parLoc);
    }
}