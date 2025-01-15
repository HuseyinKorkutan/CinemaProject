using CinemaProject.Entities.Concrete;

namespace CinemaProject.DataAccess.Abstract
{
    public interface ICustomerRepository : IEntityRepository<Customer>
    {
        // Customer'a özel metodlar buraya eklenebilir
    }
} 