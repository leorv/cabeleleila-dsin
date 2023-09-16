using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cabeleleila.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Cabeleleila.Repository.Config
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(u => u.Id);

            builder.Property(u => u.Name)
                .IsRequired()
                .HasMaxLength(50);
            
            builder.Property(u => u.Lastname)
                .HasMaxLength(128);
            
            builder.Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(80);

            builder.Property(u => u.Password)
                .IsRequired()
                .HasMaxLength(500);

            builder.Property(u => u.Administrator)
                .IsRequired()
                .HasColumnType("bit")
                .HasDefaultValue(false);

            builder.HasMany(u => u.Services)
                .WithOne(s => s.User);
        }
    }
}