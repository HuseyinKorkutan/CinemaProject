using AutoMapper;
using CinemaProject.Business.Abstract;
using CinemaProject.Business.DTOs;
using CinemaProject.DataAccess.Abstract;
using CinemaProject.Entities.Concrete;

namespace CinemaProject.Business.Concrete
{
    public class MovieManager : IMovieService
    {
        private readonly IMovieRepository _movieRepository;
        private readonly IMapper _mapper;

        public MovieManager(IMovieRepository movieRepository, IMapper mapper)
        {
            _movieRepository = movieRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<MovieDto>> GetAllAsync()
        {
            var movies = await _movieRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<MovieDto>>(movies);
        }

        public async Task<IEnumerable<MovieDto>> GetActiveMoviesAsync()
        {
            var movies = await _movieRepository.GetAllAsync(m => m.IsActive);
            return _mapper.Map<IEnumerable<MovieDto>>(movies);
        }

        public async Task<MovieDto> GetByIdAsync(int id)
        {
            var movie = await _movieRepository.GetAsync(m => m.Id == id);
            return _mapper.Map<MovieDto>(movie);
        }

        public async Task<MovieDto> AddAsync(MovieCreateDto movieCreateDto)
        {
            var movie = _mapper.Map<Movie>(movieCreateDto);
            movie.IsActive = true;
            await _movieRepository.AddAsync(movie);
            return _mapper.Map<MovieDto>(movie);
        }

        public async Task UpdateAsync(MovieUpdateDto movieUpdateDto)
        {
            var movie = _mapper.Map<Movie>(movieUpdateDto);
            await _movieRepository.UpdateAsync(movie);
        }

        public async Task DeleteAsync(int id)
        {
            var movie = await _movieRepository.GetAsync(m => m.Id == id);
            if (movie != null)
            {
                await _movieRepository.DeleteAsync(movie);
            }
        }
    }
} 