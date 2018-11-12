using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SantaAPI.ViewModels
{
    public class EditNaughtyViewModel
    {
        [Required]
        public bool IsNaughty { get; set; }
    }
}
