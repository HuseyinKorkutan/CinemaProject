using CinemaProject.Business.DTOs;

namespace CinemaProject.Business.Abstract
{
    public interface IHallService
    {
        Task<IEnumerable<HallDto>> GetAllAsync();
        Task<IEnumerable<HallDto>> GetActiveHallsAsync();
        Task<HallDto> GetByIdAsync(int id);
        Task<HallDto> AddAsync(HallCreateDto hallCreateDto);
        Task UpdateAsync(HallUpdateDto hallUpdateDto);
        Task DeleteAsync(int id);
    }
}