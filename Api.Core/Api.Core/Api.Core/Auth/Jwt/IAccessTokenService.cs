using System.Threading.Tasks;

namespace Api.Core.Auth.Jwt
{
    public interface IAccessTokenService
    {
        Task DeactivateAsync(string userId, string token);
        Task DeactivateCurrentAsync(string userId);
        Task<bool> IsActiveAsync(string token);
        Task<bool> IsCurrentActiveToken();
    }
}