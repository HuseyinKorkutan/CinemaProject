using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using CinemaProject.Business.Abstract;
using CinemaProject.Business.DTOs;
using CinemaProject.Business.Utilities.Security;
using CinemaProject.DataAccess.Abstract;
using CinemaProject.Entities.Concrete;

namespace CinemaProject.Business.Concrete
{
    public class AuthManager : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenHelper _tokenHelper;
        private readonly IMapper _mapper;

        public AuthManager(IUserRepository userRepository, ITokenHelper tokenHelper, IMapper mapper)
        {
            _userRepository = userRepository;
            _tokenHelper = tokenHelper;
            _mapper = mapper;
        }

        public async Task<UserDto> RegisterAsync(UserRegisterDto userRegisterDto)
        {
            var user = _mapper.Map<User>(userRegisterDto);
            user.IsActive = true;
            user.Role = "User"; // Varsayılan rol
            
            // Password hash'leme işlemi burada yapılabilir
            
            await _userRepository.AddAsync(user);
            return _mapper.Map<UserDto>(user);
        }

        public async Task<AccessToken> LoginAsync(UserLoginDto userLoginDto)
        {
            var user = await _userRepository.GetAsync(u => 
                u.Username == userLoginDto.Username && 
                u.Password == userLoginDto.Password && 
                u.IsActive);

            if (user == null)
                throw new Exception("Kullanıcı bulunamadı veya bilgiler hatalı!");

            // Token oluştur ve döndür
            return _tokenHelper.CreateToken(user);
        }

        public async Task<UserDto> GetByIdAsync(int id)
        {
            var user = await _userRepository.GetAsync(u => u.Id == id);
            return _mapper.Map<UserDto>(user);
        }

        public async Task<IEnumerable<UserDto>> GetAllAsync()
        {
            var users = await _userRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<UserDto>>(users);
        }
    }
} 