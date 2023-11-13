using System.ComponentModel.DataAnnotations;

namespace ContactsAPI.DTOs
{
    public class ContactCreationDTO
    {
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        [StringLength(13)]
        public string MobilePhone { get; set; }
        public string JobTitle { get; set; }
        public DateTime? BirthDate { get; set; }
    }
}
