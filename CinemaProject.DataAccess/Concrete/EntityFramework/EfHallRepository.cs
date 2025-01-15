using CinemaProject.DataAccess.Abstract;
using CinemaProject.Entities.Concrete;

namespace CinemaProject.DataAccess.Concrete.EntityFramework
{
    public class EfHallRepository : EfEntityRepositoryBase<Hall, CinemaContext>, IHallRepository
    {
        public EfHallRepository(CinemaContext context) : base(context)
        {
        }
    }
} 