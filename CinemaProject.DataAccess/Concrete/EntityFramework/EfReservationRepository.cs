using CinemaProject.DataAccess.Abstract;
using CinemaProject.Entities.Concrete;
using Microsoft.EntityFrameworkCore;

namespace CinemaProject.DataAccess.Concrete.EntityFramework
{
    public class EfReservationRepository : EfEntityRepositoryBase<Reservation, CinemaContext>, IReservationRepository
    {
        public EfReservationRepository(CinemaContext context) : base(context)
        {
        }
    }
} 