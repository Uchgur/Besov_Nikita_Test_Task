using System.ComponentModel.DataAnnotations;

namespace ContactsAPI.DTOs
{
    public class ContactDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string MobilePhone { get; set; }
        public string JobTitle { get; set; }
        public DateTime? BirthDate { get; set; }
    }
}
