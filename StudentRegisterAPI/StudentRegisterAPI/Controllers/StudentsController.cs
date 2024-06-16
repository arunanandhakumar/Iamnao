// Controllers/StudentsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentRegisterAPI.Data;
using StudentRegisterAPI.Models;

[Route("api/[controller]")]
[ApiController]
public class StudentsController : ControllerBase
{
    private readonly StudentContext _context;

    public StudentsController(StudentContext context)
    {
        _context = context;
    }

    [HttpPost("register")]
    public async Task<ActionResult<Student>> Register(Student student)
    {
        _context.Students.Add(student);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetStudent), new { id = student.Id }, student);
    }

    [HttpPost("login")]
    public async Task<ActionResult<Student>> Login([FromBody] Student login)
    {
        var student = await _context.Students
            .FirstOrDefaultAsync(s => s.Email == login.Email && s.Password == login.Password);
        if (student == null)
        {
            return NotFound("User not found");
        }
        return Ok(student);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Student>> GetStudent(int id)
    {
        var student = await _context.Students.FindAsync(id);
        if (student == null)
        {
            return NotFound();
        }
        return student;
    }
}
