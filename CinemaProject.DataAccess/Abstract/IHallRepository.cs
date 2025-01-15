using CinemaProject.Entities.Concrete;

namespace CinemaProject.DataAccess.Abstract
{
    public interface IHallRepository : IEntityRepository<Hall>
    {
        // Hall'a özel metodlar buraya eklenebilir
    }
} 