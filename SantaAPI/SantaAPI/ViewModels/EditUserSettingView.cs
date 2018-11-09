using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SantaAPI.ViewModels
{
    public class EditUserSettingView
    {
        [Required]
        public string Id { set; get; }
        [Required]
        public string City { set; get; }
        [Required]
        public string Country { set; get; }
        [Required]
        public string FirstName { set; get; }
        [Required]
        public string LastName { set; get; }
        [Required]
        public int Lattitude { set; get; }
        [Required]
        public int Longitude { set; get; }
        [Required]
        public string PostalCode { set; get; }
        [Required]
        public string Province { set; get; }
        [Required]
        public string Street { set; get; }
    }
}
