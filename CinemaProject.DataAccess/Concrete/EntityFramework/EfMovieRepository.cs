using CinemaProject.DataAccess.Abstract;
using CinemaProject.Entities.Concrete;

namespace CinemaProject.DataAccess.Concrete.EntityFramework
{
    public class EfMovieRepository : EfEntityRepositoryBase<Movie, CinemaContext>, IMovieRepository
    {
        public EfMovieRepository(CinemaContext context) : base(context)
        {
        }

        // Movie'ye özel metodların implementasyonu
    }
} 