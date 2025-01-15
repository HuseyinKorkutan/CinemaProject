using AutoMapper;
using CinemaProject.Business.Abstract;
using CinemaProject.Business.DTOs;
using CinemaProject.DataAccess.Abstract;
using CinemaProject.Entities.Concrete;

namespace CinemaProject.Business.Concrete
{
    public class CustomerManager : ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IMapper _mapper;

        public CustomerManager(ICustomerRepository customerRepository, IMapper mapper)
        {
            _customerRepository = customerRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CustomerDto>> GetAllAsync()
        {
            var customers = await _customerRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<CustomerDto>>(customers);
        }

        public async Task<IEnumerable<CustomerDto>> GetActiveCustomersAsync()
        {
            var customers = await _customerRepository.GetAllAsync(c => c.IsActive);
            return _mapper.Map<IEnumerable<CustomerDto>>(customers);
        }

        public async Task<CustomerDto> GetByIdAsync(int id)
        {
            var customer = await _customerRepository.GetAsync(c => c.Id == id);
            return _mapper.Map<CustomerDto>(customer);
        }

        public async Task<CustomerDto> AddAsync(CustomerCreateDto customerCreateDto)
        {
            var customer = _mapper.Map<Customer>(customerCreateDto);
            customer.IsActive = true;
            await _customerRepository.AddAsync(customer);
            return _mapper.Map<CustomerDto>(customer);
        }

        public async Task UpdateAsync(CustomerUpdateDto customerUpdateDto)
        {
            var customer = _mapper.Map<Customer>(customerUpdateDto);
            await _customerRepository.UpdateAsync(customer);
        }

        public async Task DeleteAsync(int id)
        {
            var customer = await _customerRepository.GetAsync(c => c.Id == id);
            if (customer != null)
            {
                await _customerRepository.DeleteAsync(customer);
            }
        }
    }
} 