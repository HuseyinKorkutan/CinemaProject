using Microsoft.AspNetCore.Mvc;
using CinemaProject.Business.Abstract;
using CinemaProject.Business.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace CinemaProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly IReservationService _reservationService;

        public ReservationsController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReservationDto>>> GetAll()
        {
            var reservations = await _reservationService.GetAllAsync();
            return Ok(reservations);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ReservationDto>> GetById(int id)
        {
            var reservation = await _reservationService.GetByIdAsync(id);
            if (reservation == null)
                return NotFound();

            return Ok(reservation);
        }

        [HttpGet("screening/{screeningId}")]
        public async Task<ActionResult<IEnumerable<ReservationDto>>> GetByScreeningId(int screeningId)
        {
            var reservations = await _reservationService.GetByScreeningIdAsync(screeningId);
            return Ok(reservations);
        }

        [HttpPost]
        public async Task<ActionResult<ReservationDto>> Create(ReservationCreateDto reservationCreateDto)
        {
            try
            {
                var createdReservation = await _reservationService.CreateAsync(reservationCreateDto);
                return CreatedAtAction(nameof(GetById), new { id = createdReservation.Id }, createdReservation);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Cancel(int id)
        {
            await _reservationService.CancelAsync(id);
            return NoContent();
        }
    }
} 