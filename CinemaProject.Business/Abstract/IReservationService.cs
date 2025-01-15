using CinemaProject.Business.DTOs;

namespace CinemaProject.Business.Abstract
{
    public interface IReservationService
    {
        Task<IEnumerable<ReservationDto>> GetAllAsync();
        Task<ReservationDto> GetByIdAsync(int id);
        Task<ReservationDto> CreateAsync(ReservationCreateDto reservationCreateDto);
        Task CancelAsync(int id);
        Task<IEnumerable<ReservationDto>> GetByScreeningIdAsync(int screeningId);
    }
} 