using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SantaAPI.DataModels
{
    public class EditChild
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string UID { get; set; }
        public int BirthDay { get; set; }
        public int BirthMonth { get; set; }
        public int BirthYear { get; set; }
        public ChildData myChildData { get; set; }
    }
}
