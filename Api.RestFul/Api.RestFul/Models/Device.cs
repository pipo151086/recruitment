using System;
using System.Collections.Generic;

#nullable disable

namespace Api.RestFul.Models
{
    public partial class Device
    {
        public string Id { get; set; }
        public int Location { get; set; }
        public string MacAddress { get; set; }
        public bool Connected { get; set; }
        public int ParentLocation { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public double Signal { get; set; }
    }
}
