using CinemaProject.Entities.Concrete;

namespace CinemaProject.DataAccess.Abstract
{
    public interface IScreeningRepository : IEntityRepository<Screening>
    {
        // Screening'e özel metodlar buraya eklenebilir
        List<Screening> GetScreeningsWithMovieAndHall();
    }
} 