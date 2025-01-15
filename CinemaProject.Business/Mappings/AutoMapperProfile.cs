using AutoMapper;
using CinemaProject.Business.DTOs;
using CinemaProject.Entities.Concrete;

namespace CinemaProject.Business.Mappings
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Movie, MovieDto>().ReverseMap();
            CreateMap<Movie, MovieCreateDto>().ReverseMap();
            CreateMap<Movie, MovieUpdateDto>().ReverseMap();

            CreateMap<Hall, HallDto>().ReverseMap();
            CreateMap<Hall, HallCreateDto>().ReverseMap();
            CreateMap<Hall, HallUpdateDto>().ReverseMap();

            CreateMap<Screening, ScreeningDto>()
                .ForMember(dest => dest.MovieName, opt => opt.MapFrom(src => src.Movie.Name))
                .ForMember(dest => dest.HallName, opt => opt.MapFrom(src => src.Hall.Name))
                .ForMember(dest => dest.ScreeningTime, opt => opt.MapFrom(src => src.ScreeningTime))
                .ForMember(dest => dest.Hall, opt => opt.MapFrom(src => src.Hall));
            CreateMap<ScreeningCreateDto, Screening>()
                .ForMember(dest => dest.ScreeningTime, opt => opt.MapFrom(src => src.ScreeningTime));
            CreateMap<Screening, ScreeningUpdateDto>().ReverseMap();

            CreateMap<Customer, CustomerDto>()
                .ForMember(dest => dest.User, opt => opt.MapFrom(src => src.User))
                .ReverseMap();
            CreateMap<Customer, CustomerCreateDto>().ReverseMap();
            CreateMap<Customer, CustomerUpdateDto>().ReverseMap();

            CreateMap<Reservation, ReservationDto>()
                .ForMember(dest => dest.MovieName, opt => opt.MapFrom(src => src.Screening.Movie.Name))
                .ForMember(dest => dest.HallName, opt => opt.MapFrom(src => src.Screening.Hall.Name))
                .ForMember(dest => dest.ScreeningTime, opt => opt.MapFrom(src => src.Screening.ScreeningTime));
            CreateMap<ReservationCreateDto, Reservation>();
            CreateMap<Reservation, ReservationUpdateDto>().ReverseMap();

            CreateMap<User, UserDto>().ReverseMap();

            // User mappings
            CreateMap<UserRegisterDto, User>();
            CreateMap<User, UserDto>();
        }
    }
} 