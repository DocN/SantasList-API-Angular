using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SantaAPI.DataModels
{
    public class UserData
    {

        public UserData()
        {

        }

        public UserData(IdentityUser User, ChildData _ChildData)
        {
            Username = User.UserName;
            Email = User.Email;
            ChildData = _ChildData;
        }

        public string Username { set; get; }
        public string Email { set; get; }

        public ChildData ChildData { set; get; }
    }
}
