using CinemaProject.Entities.Abstract;

namespace CinemaProject.Entities.Concrete
{
    public class Movie : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Director { get; set; }
        public int Duration { get; set; } // Dakika cinsinden
        public DateTime ReleaseDate { get; set; }
        public string PosterUrl { get; set; }
        public bool IsActive { get; set; }
        
        // Navigation Properties
        public virtual ICollection<Screening> Screenings { get; set; }
    }
} 