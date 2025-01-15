using CinemaProject.Entities.Concrete;

namespace CinemaProject.DataAccess.Abstract
{
    public interface IMovieRepository : IEntityRepository<Movie>
    {
        // Movie'ye özel metodlar buraya eklenebilir
    }
} 