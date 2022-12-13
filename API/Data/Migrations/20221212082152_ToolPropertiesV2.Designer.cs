﻿// <auto-generated />
using System;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace API.Data.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20221212082152_ToolPropertiesV2")]
    partial class ToolPropertiesV2
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("API.Entities.AppUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("KnownAs")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("API.Entities.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("IsMain")
                        .HasColumnType("bit");

                    b.Property<string>("PublicId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ToolsId")
                        .HasColumnType("int");

                    b.Property<string>("Url")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ToolsId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("API.Entities.ToolProperties", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int?>("CurrentValue")
                        .HasColumnType("int");

                    b.Property<bool?>("ExternalBendProtectorState")
                        .HasColumnType("bit");

                    b.Property<bool?>("ExternalCasingConditionState")
                        .HasColumnType("bit");

                    b.Property<bool?>("ExternalCompleteButtonsState")
                        .HasColumnType("bit");

                    b.Property<bool?>("ExternalCompleteHandlesState")
                        .HasColumnType("bit");

                    b.Property<bool?>("ExternalIsCleanState")
                        .HasColumnType("bit");

                    b.Property<bool?>("ExternalLeakageState")
                        .HasColumnType("bit");

                    b.Property<bool?>("ExternalOuterCoverState")
                        .HasColumnType("bit");

                    b.Property<bool?>("ExternalPlugState")
                        .HasColumnType("bit");

                    b.Property<bool?>("ExternalWireState")
                        .HasColumnType("bit");

                    b.Property<bool?>("IdleRunState")
                        .HasColumnType("bit");

                    b.Property<bool?>("InternalBearingsState")
                        .HasColumnType("bit");

                    b.Property<bool?>("InternalBendProtectorState")
                        .HasColumnType("bit");

                    b.Property<bool?>("InternalCommutatorState")
                        .HasColumnType("bit");

                    b.Property<bool?>("InternalElectricEqState")
                        .HasColumnType("bit");

                    b.Property<bool?>("InternalEngineDirtyState")
                        .HasColumnType("bit");

                    b.Property<bool?>("InternalPlugWireState")
                        .HasColumnType("bit");

                    b.Property<bool?>("IsValid")
                        .HasColumnType("bit");

                    b.Property<bool?>("IsolateResistanceState")
                        .HasColumnType("bit");

                    b.Property<int?>("MesauredResistanceState")
                        .HasColumnType("int");

                    b.Property<int?>("PermissibleProtectiveConductorResistance")
                        .HasColumnType("int");

                    b.Property<int?>("ProtectiveConductorResistance")
                        .HasColumnType("int");

                    b.Property<int?>("RequiredResistanceState")
                        .HasColumnType("int");

                    b.Property<int>("ToolsId")
                        .HasColumnType("int");

                    b.Property<int?>("VoltageValue")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ToolsId")
                        .IsUnique();

                    b.ToTable("Properties");
                });

            modelBuilder.Entity("API.Entities.Tools", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("AppUserId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateOfService")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ToolName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ToolNumber")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AppUserId");

                    b.ToTable("Tools");
                });

            modelBuilder.Entity("API.Entities.Photo", b =>
                {
                    b.HasOne("API.Entities.Tools", "Tools")
                        .WithMany("Photos")
                        .HasForeignKey("ToolsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Tools");
                });

            modelBuilder.Entity("API.Entities.ToolProperties", b =>
                {
                    b.HasOne("API.Entities.Tools", "Tools")
                        .WithOne("ToolProperties")
                        .HasForeignKey("API.Entities.ToolProperties", "ToolsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Tools");
                });

            modelBuilder.Entity("API.Entities.Tools", b =>
                {
                    b.HasOne("API.Entities.AppUser", "AppUser")
                        .WithMany("Tools")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("API.Entities.AppUser", b =>
                {
                    b.Navigation("Tools");
                });

            modelBuilder.Entity("API.Entities.Tools", b =>
                {
                    b.Navigation("Photos");

                    b.Navigation("ToolProperties");
                });
#pragma warning restore 612, 618
        }
    }
}
