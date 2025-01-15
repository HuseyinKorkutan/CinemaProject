using CinemaProject.Business.DTOs;

namespace CinemaProject.Business.DTOs
{
    public class CustomerDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public bool IsActive { get; set; }
        public int? UserId { get; set; }
        public UserDto User { get; set; }
    }

    public class CustomerCreateDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public int? UserId { get; set; }
    }

    public class CustomerUpdateDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public int? UserId { get; set; }
    }
} 