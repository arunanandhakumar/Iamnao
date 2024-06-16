// Data/StudentContext.cs
using Microsoft.EntityFrameworkCore;
using StudentRegisterAPI.Models;
using System.Collections.Generic;

namespace StudentRegisterAPI.Data
{
    public class StudentContext : DbContext
    {
        public StudentContext(DbContextOptions<StudentContext> options) : base(options) { }

        public DbSet<Student> Students { get; set; }
    }
}
