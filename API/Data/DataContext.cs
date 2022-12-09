using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<AppUser> Users { get; set; }
        public DbSet<Tools> Tools { get; set; }
        public DbSet<ToolProperties> ToolProps { get; set; }
        public DbSet<ToolToolProperties> Properties { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ToolToolProperties>()
                .HasKey(bc => new { bc.ToolId, bc.ToolPropertiesId });

            modelBuilder.Entity<ToolToolProperties>()
                .HasOne(bc => bc.Tool)
                .WithMany(b => b.ToolToolProperties)
                .HasForeignKey(bc => bc.ToolId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ToolToolProperties>()
                .HasOne(bc => bc.ToolProperties)
                .WithMany(c => c.ToolToolProperties)
                .HasForeignKey(bc => bc.ToolPropertiesId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}