using CinemaProject.Business.DTOs;

namespace CinemaProject.Business.Abstract
{
    public interface ICustomerService
    {
        Task<IEnumerable<CustomerDto>> GetAllAsync();
        Task<IEnumerable<CustomerDto>> GetActiveCustomersAsync();
        Task<CustomerDto> GetByIdAsync(int id);
        Task<CustomerDto> AddAsync(CustomerCreateDto customerCreateDto);
        Task UpdateAsync(CustomerUpdateDto customerUpdateDto);
        Task DeleteAsync(int id);
    }
} 