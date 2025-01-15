using CinemaProject.Entities.Concrete;

namespace CinemaProject.DataAccess.Abstract
{
    public interface IUserRepository : IEntityRepository<User>
    {
        User GetByUsername(string username);
    }
} 