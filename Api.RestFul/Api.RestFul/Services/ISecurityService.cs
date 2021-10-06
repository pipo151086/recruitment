using Api.RestFul.Dto;
using System.Threading.Tasks;

namespace Api.RestFul.Services
{
    public interface ISecurityService
    {
        Task<object> Login(LoginDto loginDto);
    }
}