using CinemaProject.Entities.Concrete;

namespace CinemaProject.Business.Utilities.Security
{
    public interface ITokenHelper
    {
        AccessToken CreateToken(User user);
    }
} 