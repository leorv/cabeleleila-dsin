using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cabeleleila.Domain.Entities;
using Cabeleleila.Domain.ValueObject;
using Cabeleleila.Repository.Config;
using Microsoft.EntityFrameworkCore;

namespace Cabeleleila.Repository.Context
{
    public class CabeleleilaContext : DbContext
    {
        public CabeleleilaContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<PaymentMethod> PaymentMethod { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuração para mapeamento das classes
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new ServiceConfiguration());
            modelBuilder.ApplyConfiguration(new PaymentMethodConfiguration());

            // Popular a forma de pagamento
            modelBuilder.Entity<PaymentMethod>().HasData(new PaymentMethod()
            {
                Id = 0,
                Name = "Não definido",
                Description = "A forma de pagamento não foi informada, deve ser confirmada antecipadamente no local."
            },
            modelBuilder.Entity<PaymentMethod>().HasData(new PaymentMethod()
            {
                Id = 1,
                Name = "Cartão de crédito",
                Description = "Cartão de crédito das bandeiras mais comuns."
            },
            modelBuilder.Entity<PaymentMethod>().HasData(new PaymentMethod()
            {
                Id = 2,
                Name = "PIX",
                Description = "A forma preferida de pagamento da maioria dos usuários."
            }
            )));

            base.OnModelCreating(modelBuilder);
        }
    }
}