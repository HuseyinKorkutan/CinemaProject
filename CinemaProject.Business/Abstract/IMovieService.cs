using CinemaProject.Business.DTOs;

namespace CinemaProject.Business.Abstract
{
    public interface IMovieService
    {
        Task<IEnumerable<MovieDto>> GetAllAsync();
        Task<IEnumerable<MovieDto>> GetActiveMoviesAsync();
        Task<MovieDto> GetByIdAsync(int id);
        Task<MovieDto> AddAsync(MovieCreateDto movieCreateDto);
        Task UpdateAsync(MovieUpdateDto movieUpdateDto);
        Task DeleteAsync(int id);
    }
} 