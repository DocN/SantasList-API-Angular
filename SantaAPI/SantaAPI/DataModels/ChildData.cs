using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SantaAPI.DataModels
{
    public class ChildData
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDate { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public int Latitude { get; set; }
        public int Longitude { get; set; }
        public bool IsNaughty { get; set; }
        public DateTime DateTime { get; set; }
        public Guid CreatedBy { get; set; }

    }
}
