using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Api.RestFul.Models
{
    public partial class TestDevicesContext : DbContext
    {
        public TestDevicesContext()
        {
        }

        public TestDevicesContext(DbContextOptions<TestDevicesContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Device> Devices { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //This Should be moved to vo
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                //optionsBuilder.UseSqlServer("Server=PORVMDEVGT\\INS01;Database=TestDevices;Trusted_Connection=True;");
                optionsBuilder.UseSqlServer("Server=PORVMDEVGT\\INS01;Database=TestDevices;Trusted_Connection=False;User ID=DevUserGT;Password=dEVuSERgt#;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Modern_Spanish_CI_AS");

            modelBuilder.Entity<Device>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("devices");

                entity.Property(e => e.Connected).HasColumnName("connected");

                entity.Property(e => e.Id)
                    .HasMaxLength(64)
                    .IsUnicode(false)
                    .HasColumnName("id");

                entity.Property(e => e.Location).HasColumnName("location");

                entity.Property(e => e.MacAddress)
                    .HasMaxLength(64)
                    .IsUnicode(false)
                    .HasColumnName("mac_address");

                entity.Property(e => e.ParentLocation).HasColumnName("parent_location");

                entity.Property(e => e.Signal).HasColumnName("signal");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
