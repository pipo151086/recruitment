using Api.RestFul.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.RestFul.Services
{
    public interface IDeviceService 
    {
        Task<List<Device>> FilterLocParConAsync(int location, int parentLocation, bool connected);
        Task<List<Device>> GetAll();

    }
}