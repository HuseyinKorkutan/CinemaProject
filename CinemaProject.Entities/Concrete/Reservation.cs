using CinemaProject.Entities.Abstract;

namespace CinemaProject.Entities.Concrete
{
    public class Reservation : IEntity
    {
        public int Id { get; set; }
        public int ScreeningId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
        public string SeatNumber { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual Screening Screening { get; set; }
    }
}