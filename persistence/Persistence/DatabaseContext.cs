using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions options) : base(options)
        {
           
        }

        public DbSet<Activity> Activities { get; set; }
    }
}
