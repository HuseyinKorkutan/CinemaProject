using CinemaProject.Entities.Concrete;

namespace CinemaProject.DataAccess.Abstract
{
    public interface IReservationRepository : IEntityRepository<Reservation>
    {
        // Şu an için özel bir metoda ihtiyacımız yok
    }
} 