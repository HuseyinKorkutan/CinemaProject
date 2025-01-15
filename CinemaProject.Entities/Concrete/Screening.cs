using CinemaProject.Entities.Abstract;

namespace CinemaProject.Entities.Concrete
{
    public class Screening : IEntity
    {
        public int Id { get; set; }
        public int MovieId { get; set; }
        public int HallId { get; set; }
        public DateTime ScreeningTime { get; set; }
        public decimal Price { get; set; }
        public bool IsActive { get; set; }

        // Navigation Properties
        public virtual Movie Movie { get; set; }
        public virtual Hall Hall { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }
    }
} 