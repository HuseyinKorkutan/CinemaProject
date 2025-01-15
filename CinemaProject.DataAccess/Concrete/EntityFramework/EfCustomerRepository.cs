using CinemaProject.DataAccess.Abstract;
using CinemaProject.Entities.Concrete;

namespace CinemaProject.DataAccess.Concrete.EntityFramework
{
    public class EfCustomerRepository : EfEntityRepositoryBase<Customer, CinemaContext>, ICustomerRepository
    {
        public EfCustomerRepository(CinemaContext context) : base(context)
        {
        }
    }
} 