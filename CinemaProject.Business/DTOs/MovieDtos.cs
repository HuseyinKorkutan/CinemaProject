namespace CinemaProject.Business.DTOs
{
    public class MovieDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Director { get; set; }
        public int Duration { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string PosterUrl { get; set; }
        public bool IsActive { get; set; }
    }

    public class MovieCreateDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Director { get; set; }
        public int Duration { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string PosterUrl { get; set; }
    }

    public class MovieUpdateDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Director { get; set; }
        public int Duration { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string PosterUrl { get; set; }
        public bool IsActive { get; set; }
    }
} 