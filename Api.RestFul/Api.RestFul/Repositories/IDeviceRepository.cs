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
    }
}