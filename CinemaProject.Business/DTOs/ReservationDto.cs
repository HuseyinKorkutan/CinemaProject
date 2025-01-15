public class ReservationDto
{
    public int Id { get; set; }
    public int ScreeningId { get; set; }
    public string CustomerName { get; set; }
    public string CustomerPhone { get; set; }
    public string SeatNumber { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    
    public string MovieName { get; set; }
    public string HallName { get; set; }
    public DateTime ScreeningTime { get; set; }
} 