public class ScreeningDto
{
    public int Id { get; set; }
    public int MovieId { get; set; }
    public int HallId { get; set; }
    public string MovieName { get; set; }
    public string HallName { get; set; }
    public DateTime ScreeningTime { get; set; }
    public decimal Price { get; set; }
    public bool IsActive { get; set; }
    public HallDto Hall { get; set; }
} 