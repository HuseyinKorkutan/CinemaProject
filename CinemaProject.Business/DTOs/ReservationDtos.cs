using System;

namespace CinemaProject.Business.DTOs
{
    public class ReservationDto
    {
        public int Id { get; set; }
        public int ScreeningId { get; set; }
        public int CustomerId { get; set; }
        public int SeatNumber { get; set; }
        public bool IsPaid { get; set; }
        public bool IsActive { get; set; }
        public DateTime ReservationDate { get; set; }
        
        // Navigation properties
        public string MovieName { get; set; }
        public string HallName { get; set; }
        public string CustomerName { get; set; }
        public CustomerDto Customer { get; set; }
    }

    public class ReservationCreateDto
    {
        public int ScreeningId { get; set; }
        public int CustomerId { get; set; }
        public int SeatNumber { get; set; }
        public bool IsPaid { get; set; }
    }

    public class ReservationUpdateDto
    {
        public int Id { get; set; }
        public int ScreeningId { get; set; }
        public int CustomerId { get; set; }
        public int SeatNumber { get; set; }
        public bool IsPaid { get; set; }
        public bool IsActive { get; set; }
    }
}