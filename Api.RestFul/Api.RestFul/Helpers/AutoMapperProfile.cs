using Api.RestFul.Dto;
using Api.RestFul.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.RestFul.Helpers
{
    public class AutoMapperProfile : AutoMapper.Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Device, DeviceDto>().ReverseMap();

        }

    }
}
