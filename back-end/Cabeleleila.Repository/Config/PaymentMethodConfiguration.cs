using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cabeleleila.Domain.ValueObject;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Cabeleleila.Repository.Config
{
    public class PaymentMethodConfiguration : IEntityTypeConfiguration<PaymentMethod>
    {
        public void Configure(EntityTypeBuilder<PaymentMethod> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(20);

            builder.Property(p => p.Description)
                .HasMaxLength(200);

            // Propriedades a ignorar
            builder.Ignore(p => p.IsCreditCard);
            builder.Ignore(p => p.IsPIX);
            builder.Ignore(p => p.IsUndefined);
        }
    }
}