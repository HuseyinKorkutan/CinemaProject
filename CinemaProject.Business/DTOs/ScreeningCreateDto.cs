public class ScreeningCreateDto
{
    public int MovieId { get; set; }
    public int HallId { get; set; }
    public DateTime ScreeningTime { get; set; }
    public decimal Price { get; set; }
    public bool IsActive { get; set; }
} 