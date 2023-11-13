using AutoMapper;
using ContactsAPI.DTOs;
using ContactsAPI.Entities;
using ContactsAPI.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContactsAPI.Controllers
{
    [Route("api/contacts")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ContactsController(ILogger<ContactsController> logger, ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<ContactDTO>>> Get()
        {
            var genres = await _context.Contacts.OrderBy(x => x.Name).ToListAsync();
            return _mapper.Map<List<ContactDTO>>(genres);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ContactDTO>> Get(int id)
        {
            var contact = await _context.Contacts.FirstOrDefaultAsync(x => x.Id == id);

            if (contact == null)
            {
                return NotFound();
            }

            return _mapper.Map<ContactDTO>(contact);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ContactCreationDTO contactCreationDTO)
        {
            var contact = _mapper.Map<Contact>(contactCreationDTO);
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] ContactCreationDTO contactCreationDTO)
        {
            var contact = await _context.Contacts.FirstOrDefaultAsync(x => x.Id == id);

            if (contact == null)
            {
                return NotFound();
            }

            contact = _mapper.Map(contactCreationDTO, contact);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var contact = await _context.Contacts.AnyAsync(x => x.Id == id);

            if (contact == null)
            {
                return NotFound();
            }

            _context.Remove(new Contact() { Id = id });
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
