using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SantaAPI.DataModels
{
    public class UserData
    {
        public string Username { set; get; }
        public string Email { set; get; }

        public ChildData ChildData { set; get; }
    }
}
