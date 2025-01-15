namespace CinemaProject.Business.DTOs
{
    public class HallDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Capacity { get; set; }
        public bool IsActive { get; set; }
    }

    public class HallCreateDto
    {
        public string Name { get; set; }
        public int Capacity { get; set; }
    }

    public class HallUpdateDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Capacity { get; set; }
        public bool IsActive { get; set; }
    }
} 