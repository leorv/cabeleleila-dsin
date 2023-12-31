﻿// <auto-generated />
using System;
using Cabeleleila.Repository.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Cabeleleila.Repository.Migrations
{
    [DbContext(typeof(CabeleleilaContext))]
    [Migration("20230917160631_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.22")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Cabeleleila.Domain.Entities.Service", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<decimal>("Price")
                        .HasColumnType("DECIMAL(19,4)");

                    b.Property<DateTime>("RequestDate")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("ScheduledDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Status")
                        .HasColumnType("longtext");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Services");
                });

            modelBuilder.Entity("Cabeleleila.Domain.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<ulong>("Administrator")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(0ul);

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(80)
                        .HasColumnType("varchar(80)");

                    b.Property<string>("Lastname")
                        .HasMaxLength(128)
                        .HasColumnType("varchar(128)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("varchar(500)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Cabeleleila.Domain.ValueObject.PaymentMethod", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("varchar(20)");

                    b.HasKey("Id");

                    b.ToTable("PaymentMethod");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "A forma de pagamento não foi informada, deve ser confirmada antecipadamente no local.",
                            Name = "Não definido"
                        },
                        new
                        {
                            Id = 2,
                            Description = "Cartão de crédito das bandeiras mais comuns.",
                            Name = "Cartão de crédito"
                        },
                        new
                        {
                            Id = 3,
                            Description = "A forma preferida de pagamento para maioria dos usuários.",
                            Name = "PIX"
                        });
                });

            modelBuilder.Entity("Cabeleleila.Domain.Entities.Service", b =>
                {
                    b.HasOne("Cabeleleila.Domain.Entities.User", null)
                        .WithMany("Services")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Cabeleleila.Domain.Entities.User", b =>
                {
                    b.Navigation("Services");
                });
#pragma warning restore 612, 618
        }
    }
}
