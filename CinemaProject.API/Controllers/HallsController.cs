using CinemaProject.Business.Abstract;
using CinemaProject.Business.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CinemaProject.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class HallsController : ControllerBase
    {
        private readonly IHallService _hallService;

        public HallsController(IHallService hallService)
        {
            _hallService = hallService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _hallService.GetAllAsync();
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet("active")]
        public async Task<IActionResult> GetActive()
        {
            var result = await _hallService.GetActiveHallsAsync();
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _hallService.GetByIdAsync(id);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] HallCreateDto hallCreateDto)
        {
            var result = await _hallService.AddAsync(hallCreateDto);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] HallUpdateDto hallUpdateDto)
        {
            await _hallService.UpdateAsync(hallUpdateDto);
            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _hallService.DeleteAsync(id);
            return Ok();
        }
    }
} 