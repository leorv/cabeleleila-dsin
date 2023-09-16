using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cabeleleila.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Cabeleleila.Repository.Config
{
    public class ServiceConfiguration : IEntityTypeConfiguration<Service>
    {
        public void Configure(EntityTypeBuilder<Service> builder)
        {
            builder.HasKey(s => s.Id);

            builder.Property(s => s.Name)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(s => s.RequestDate)
                .IsRequired();
            
            builder.Property(s => s.ScheduledDate)
                .IsRequired();
            
            builder.Property(s => s.Price)
                .HasColumnType("DECIMAL(19,4)");
        }
    }
}