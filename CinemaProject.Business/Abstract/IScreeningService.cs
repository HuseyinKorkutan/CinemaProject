using CinemaProject.Business.DTOs;

namespace CinemaProject.Business.Abstract
{
    public interface IScreeningService
    {
        Task<IEnumerable<ScreeningDto>> GetAllAsync();
        Task<IEnumerable<ScreeningDto>> GetActiveScreeningsAsync();
        Task<ScreeningDto> GetByIdAsync(int id);
        Task<IEnumerable<ScreeningDto>> GetScreeningsByMovieAsync(int movieId);
        Task<ScreeningDto> AddAsync(ScreeningCreateDto screeningCreateDto);
        Task UpdateAsync(ScreeningUpdateDto screeningUpdateDto);
        Task DeleteAsync(int id);
    }
} 