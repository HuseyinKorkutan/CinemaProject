using CinemaProject.Entities.Abstract;

namespace CinemaProject.Entities.Concrete
{
    public class Customer : IEntity
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public bool IsActive { get; set; }
        
        public int? UserId { get; set; }
        public User User { get; set; }
        
        public virtual ICollection<Reservation> Reservations { get; set; }
    }
} 