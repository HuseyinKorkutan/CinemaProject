namespace CinemaProject.Business.DTOs
{
    public class ScreeningDto
    {
        public int Id { get; set; }
        public int MovieId { get; set; }
        public int HallId { get; set; }
        public DateTime StartTime { get; set; }
        public decimal Price { get; set; }
        public bool IsActive { get; set; }

        // Navigation properties
        public string MovieName { get; set; }
        public string HallName { get; set; }
    }

    public class ScreeningCreateDto
    {
        public int MovieId { get; set; }
        public int HallId { get; set; }
        public DateTime StartTime { get; set; }
        public decimal Price { get; set; }
    }

    public class ScreeningUpdateDto
    {
        public int Id { get; set; }
        public int MovieId { get; set; }
        public int HallId { get; set; }
        public DateTime StartTime { get; set; }
        public decimal Price { get; set; }
        public bool IsActive { get; set; }
    }
} 