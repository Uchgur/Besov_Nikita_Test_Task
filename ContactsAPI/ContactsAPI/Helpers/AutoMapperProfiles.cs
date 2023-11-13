using AutoMapper;
using ContactsAPI.DTOs;
using ContactsAPI.Entities;

namespace ContactsAPI.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<ContactDTO, Contact>().ReverseMap();
            CreateMap<ContactCreationDTO, Contact>();
        }
    }
}
