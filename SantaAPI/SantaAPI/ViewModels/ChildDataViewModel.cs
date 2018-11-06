﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SantaAPI.ViewModels
{
    public class ChildDataViewModel
    {
        public string Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Street { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Province { get; set; }
        [Required]
        public string PostalCode { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public int Latitude { get; set; }
        [Required]
        public int Longitude { get; set; }

        [Required]
        public int BirthMonth { get; set; }
        [Required]
        public int BirthDay { get; set; }
        [Required]
        public int BirthYear { get; set; }
        [Required]
        public bool IsNaughty { get; set; }

    }
}