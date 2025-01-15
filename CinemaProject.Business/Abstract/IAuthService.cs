using CinemaProject.Business.DTOs;
using CinemaProject.Business.Utilities.Security;

namespace CinemaProject.Business.Abstract
{
    public interface IAuthService
    {
        Task<UserDto> RegisterAsync(UserRegisterDto userRegisterDto);
        Task<AccessToken> LoginAsync(UserLoginDto userLoginDto);
        Task<UserDto> GetByIdAsync(int id);
        Task<IEnumerable<UserDto>> GetAllAsync();
    }
} 