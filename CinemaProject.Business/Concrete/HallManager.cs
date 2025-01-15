using AutoMapper;
using CinemaProject.Business.Abstract;
using CinemaProject.Business.DTOs;
using CinemaProject.DataAccess.Abstract;
using CinemaProject.Entities.Concrete;

namespace CinemaProject.Business.Concrete
{
    public class HallManager : IHallService
    {
        private readonly IHallRepository _hallRepository;
        private readonly IMapper _mapper;

        public HallManager(IHallRepository hallRepository, IMapper mapper)
        {
            _hallRepository = hallRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<HallDto>> GetAllAsync()
        {
            var halls = await _hallRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<HallDto>>(halls);
        }

        public async Task<IEnumerable<HallDto>> GetActiveHallsAsync()
        {
            var halls = await _hallRepository.GetAllAsync(h => h.IsActive);
            return _mapper.Map<IEnumerable<HallDto>>(halls);
        }

        public async Task<HallDto> GetByIdAsync(int id)
        {
            var hall = await _hallRepository.GetAsync(h => h.Id == id);
            return _mapper.Map<HallDto>(hall);
        }

        public async Task<HallDto> AddAsync(HallCreateDto hallCreateDto)
        {
            var hall = _mapper.Map<Hall>(hallCreateDto);
            hall.IsActive = true;
            await _hallRepository.AddAsync(hall);
            return _mapper.Map<HallDto>(hall);
        }

        public async Task UpdateAsync(HallUpdateDto hallUpdateDto)
        {
            var hall = _mapper.Map<Hall>(hallUpdateDto);
            await _hallRepository.UpdateAsync(hall);
        }

        public async Task DeleteAsync(int id)
        {
            var hall = await _hallRepository.GetAsync(h => h.Id == id);
            if (hall != null)
            {
                await _hallRepository.DeleteAsync(hall);
            }
        }
    }
} 