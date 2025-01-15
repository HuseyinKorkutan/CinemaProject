using AutoMapper;
using CinemaProject.Business.Abstract;
using CinemaProject.Business.DTOs;
using CinemaProject.DataAccess.Abstract;
using CinemaProject.Entities.Concrete;
using Microsoft.EntityFrameworkCore;

namespace CinemaProject.Business.Concrete
{
    public class ScreeningManager : IScreeningService
    {
        private readonly IScreeningRepository _screeningRepository;
        private readonly IMapper _mapper;

        public ScreeningManager(IScreeningRepository screeningRepository, IMapper mapper)
        {
            _screeningRepository = screeningRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ScreeningDto>> GetAllAsync()
        {
            var screenings = await _screeningRepository.GetAllAsync(null, s => s.Movie, s => s.Hall);
            return _mapper.Map<IEnumerable<ScreeningDto>>(screenings);
        }

        public async Task<IEnumerable<ScreeningDto>> GetActiveScreeningsAsync()
        {
            var screenings = await _screeningRepository.GetAllAsync(s => s.IsActive, s => s.Movie, s => s.Hall);
            return _mapper.Map<IEnumerable<ScreeningDto>>(screenings);
        }

        public async Task<ScreeningDto> GetByIdAsync(int id)
        {
            var screening = await _screeningRepository.GetAsync(s => s.Id == id, s => s.Movie, s => s.Hall);
            return _mapper.Map<ScreeningDto>(screening);
        }

        public async Task<IEnumerable<ScreeningDto>> GetScreeningsByMovieAsync(int movieId)
        {
            var screenings = await _screeningRepository.GetAllAsync(
                s => s.MovieId == movieId && s.IsActive,
                s => s.Movie,
                s => s.Hall
            );
            return _mapper.Map<IEnumerable<ScreeningDto>>(screenings);
        }

        public async Task<ScreeningDto> AddAsync(ScreeningCreateDto screeningCreateDto)
        {
            var screening = _mapper.Map<Screening>(screeningCreateDto);
            screening.IsActive = true;
            await _screeningRepository.AddAsync(screening);
            
            // Yeni eklenen screening'i ilişkili verilerle birlikte tekrar çekelim
            var addedScreening = await _screeningRepository.GetAsync(
                s => s.Id == screening.Id,
                s => s.Movie,
                s => s.Hall
            );
            
            return _mapper.Map<ScreeningDto>(addedScreening);
        }

        public async Task UpdateAsync(ScreeningUpdateDto screeningUpdateDto)
        {
            var screening = _mapper.Map<Screening>(screeningUpdateDto);
            await _screeningRepository.UpdateAsync(screening);
        }

        public async Task DeleteAsync(int id)
        {
            var screening = await _screeningRepository.GetAsync(s => s.Id == id);
            if (screening != null)
            {
                await _screeningRepository.DeleteAsync(screening);
            }
        }

        public async Task<IEnumerable<ScreeningDto>> GetScreeningsByMovieIdAsync(int movieId)
        {
            var screenings = await _screeningRepository.GetAllAsync(
                s => s.MovieId == movieId,
                s => s.Movie,
                s => s.Hall
            );
            return _mapper.Map<IEnumerable<ScreeningDto>>(screenings);
        }
    }
} 