using CinemaProject.DataAccess.Abstract;
using CinemaProject.Entities.Concrete;
using Microsoft.EntityFrameworkCore;

namespace CinemaProject.DataAccess.Concrete.EntityFramework
{
    public class EfScreeningRepository : EfEntityRepositoryBase<Screening, CinemaContext>, IScreeningRepository
    {
        public EfScreeningRepository(CinemaContext context) : base(context)
        {
        }

        public List<Screening> GetScreeningsWithMovieAndHall()
        {
            using (var context = new CinemaContext())
            {
                return context.Screenings
                    .Include(s => s.Movie)
                    .Include(s => s.Hall)
                    .ToList();
            }
        }
    }
} 