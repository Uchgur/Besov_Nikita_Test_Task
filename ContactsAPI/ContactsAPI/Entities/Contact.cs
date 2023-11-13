using System.ComponentModel.DataAnnotations;

namespace ContactsAPI.Entities
{
    public class Contact
    {
        public int Id { get; set; }
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
