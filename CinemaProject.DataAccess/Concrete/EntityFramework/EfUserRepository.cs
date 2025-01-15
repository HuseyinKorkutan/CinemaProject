using CinemaProject.DataAccess.Abstract;
using CinemaProject.Entities.Concrete;
using Microsoft.EntityFrameworkCore;

namespace CinemaProject.DataAccess.Concrete.EntityFramework
{
    public class EfUserRepository : EfEntityRepositoryBase<User, CinemaContext>, IUserRepository
    {
        public EfUserRepository(CinemaContext context) : base(context)
        {
        }

        public User GetByUsername(string username)
        {
            using (var context = new CinemaContext())
            {
                return context.Set<User>().FirstOrDefault(u => u.Username == username);
            }
        }
    }
}