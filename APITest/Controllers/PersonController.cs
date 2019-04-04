using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APITest.Models;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.AspNetCore.Hosting.Internal.HostingApplication;
using Microsoft.EntityFrameworkCore;


namespace APITest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly TodoContext _context;

        public PersonController(TodoContext context)
        {
            _context = context;


            if (_context.PersonItems.Count() == 0)
            {
                // Create a new Person if collection is empty,
                // which means you can't delete all Person.
                _context.PersonItems.Add(new Person { Name = "First User", Email = "teste@teste.com", Phone = "555-9999" });
                _context.SaveChanges();

            }
        }

        // GET: /ListById/5
        [HttpGet("/ListById/{id}")]
        public async Task<ActionResult<Person>> GetPerson(long id)
        {
            var todoItem = await _context.PersonItems.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }


        // GET: /ListAllPerson
        [HttpGet("/ListAllPerson")]
        public async Task<ActionResult<IEnumerable<Person>>> GetAllPersonItems()
        {
            return await _context.PersonItems.ToListAsync();
        }


        // POST: /CreatePerson
        [HttpPost("/CreatePerson")]
        public async Task<ActionResult<Person>> PostPersonItem(Person item)
        {
            _context.PersonItems.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPerson), new { item.Id }, item);
        }

        // DELETE:/DeletePerson/5
        [HttpDelete("/DeletePerson/{id}")]
        public async Task<IActionResult> DeletePerson(long id)
        {
            var PersonItem = await _context.PersonItems.FindAsync(id);

            if (PersonItem == null)
            {
                return NotFound();
            }

            _context.PersonItems.Remove(PersonItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: /UpdatePerson/5
        [HttpPut("/UpdatePerson/{id}")]
        public async Task<IActionResult> PutPerson(long id, Person item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

