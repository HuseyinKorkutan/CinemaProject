using AutoMapper;
using CinemaProject.Business.Abstract;
using CinemaProject.Business.DTOs;
using CinemaProject.DataAccess.Abstract;
using CinemaProject.Entities.Concrete;

namespace CinemaProject.Business.Concrete
{
    public class ReservationManager : IReservationService
    {
        private readonly IReservationRepository _reservationRepository;
        private readonly IMapper _mapper;

        public ReservationManager(IReservationRepository reservationRepository, IMapper mapper)
        {
            _reservationRepository = reservationRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ReservationDto>> GetAllAsync()
        {
            var reservations = await _reservationRepository.GetAllAsync(null, r => r.Screening.Movie, r => r.Screening.Hall);
            return _mapper.Map<IEnumerable<ReservationDto>>(reservations);
        }

        public async Task<ReservationDto> GetByIdAsync(int id)
        {
            var reservation = await _reservationRepository.GetAsync(r => r.Id == id, r => r.Screening.Movie, r => r.Screening.Hall);
            return _mapper.Map<ReservationDto>(reservation);
        }

        public async Task<ReservationDto> CreateAsync(ReservationCreateDto reservationCreateDto)
        {
            var reservation = _mapper.Map<Reservation>(reservationCreateDto);
            reservation.IsActive = true;
            reservation.CreatedAt = DateTime.Now;

            await _reservationRepository.AddAsync(reservation);
            
            var createdReservation = await _reservationRepository.GetAsync(
                r => r.Id == reservation.Id,
                r => r.Screening.Movie,
                r => r.Screening.Hall
            );

            return _mapper.Map<ReservationDto>(createdReservation);
        }

        public async Task CancelAsync(int id)
        {
            var reservation = await _reservationRepository.GetAsync(r => r.Id == id);
            if (reservation != null)
            {
                reservation.IsActive = false;
                await _reservationRepository.UpdateAsync(reservation);
            }
        }

        public async Task<IEnumerable<ReservationDto>> GetByScreeningIdAsync(int screeningId)
        {
            var reservations = await _reservationRepository.GetAllAsync(
                r => r.ScreeningId == screeningId,
                r => r.Screening.Movie,
                r => r.Screening.Hall
            );
            return _mapper.Map<IEnumerable<ReservationDto>>(reservations);
        }
    }
} 