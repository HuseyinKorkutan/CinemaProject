using CinemaProject.Business.Abstract;
using CinemaProject.Business.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CinemaProject.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ScreeningsController : ControllerBase
    {
        private readonly IScreeningService _screeningService;

        public ScreeningsController(IScreeningService screeningService)
        {
            _screeningService = screeningService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _screeningService.GetAllAsync();
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet("active")]
        public async Task<IActionResult> GetActive()
        {
            var result = await _screeningService.GetActiveScreeningsAsync();
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _screeningService.GetByIdAsync(id);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet("movie/{movieId}")]
        public async Task<IActionResult> GetByMovie(int movieId)
        {
            var result = await _screeningService.GetScreeningsByMovieAsync(movieId);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] ScreeningCreateDto screeningCreateDto)
        {
            var result = await _screeningService.AddAsync(screeningCreateDto);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] ScreeningUpdateDto screeningUpdateDto)
        {
            await _screeningService.UpdateAsync(screeningUpdateDto);
            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _screeningService.DeleteAsync(id);
            return Ok();
        }
    }
}