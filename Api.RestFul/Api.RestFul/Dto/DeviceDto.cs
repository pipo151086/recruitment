using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.RestFul.Dto
{
    public class DeviceDto
    {
        public string Id { get; set; }
        public int Location { get; set; }
        public string MacAddress { get; set; }
        public bool Connected { get; set; }
        public int ParentLocation { get; set; }
        public DateTime UpdatedAt { get; set; }
        public double Signal { get; set; }
    }
}
