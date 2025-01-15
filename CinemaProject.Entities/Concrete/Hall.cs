using CinemaProject.Entities.Abstract;

namespace CinemaProject.Entities.Concrete
{
    public class Hall : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Capacity { get; set; }
        public bool IsActive { get; set; }

        // Navigation Properties
        public virtual ICollection<Screening> Screenings { get; set; }
    }
} 