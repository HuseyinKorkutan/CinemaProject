using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CinemaProject.Data;
using CinemaProject.Models;
using CinemaProject.DTOs;

namespace CinemaProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HallsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HallsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Halls
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hall>>> GetHalls()
        {
            return await _context.Halls.ToListAsync();
        }

        // GET: api/Halls/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Hall>> GetHall(int id)
        {
            var hall = await _context.Halls.FindAsync(id);

            if (hall == null)
            {
                return NotFound();
            }

            return hall;
        }

        // PUT: api/Halls/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateHall(int id, HallDto hallDto)
        {
            var hall = await _context.Halls.FindAsync(id);
            
            if (hall == null)
            {
                return NotFound();
            }

            hall.Name = hallDto.Name;
            hall.Capacity = hallDto.Capacity;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(hall);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // POST: api/Halls
        [HttpPost]
        public async Task<ActionResult<Hall>> CreateHall([FromBody] HallDto hallDto)
        {
            var hall = new Hall
            {
                Name = hallDto.Name,
                Capacity = hallDto.Capacity
            };

            _context.Halls.Add(hall);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetHall), new { id = hall.Id }, hall);
        }

        // DELETE: api/Halls/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHall(int id)
        {
            var hall = await _context.Halls.FindAsync(id);
            if (hall == null)
            {
                return NotFound();
            }

            _context.Halls.Remove(hall);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
} 