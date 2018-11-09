using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SantaAPI.Data;
using SantaAPI.DataModels;

namespace SantaAPI.Controllers
{
    

    //needs to be logged in to use these functions
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserDataController : Controller
    {
        private const string USERNAME_TYPE = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ApplicationDBContext _context;
        public UserDataController(ApplicationDBContext context, UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
            _context = context;
        }
        [EnableCors("AllAccessCors")]
        [HttpGet]
        public async Task<object> UserDataAsync()
        {
            var userSub = User.Claims.Where(c => c.Type == USERNAME_TYPE).FirstOrDefault();
            string username = userSub.Value;

            var result = new Error();
            result.SetNoUser();
            if (userSub != null)
            {
                var user = await _userManager.FindByNameAsync(username);

                UserData CurrentUser = new UserData();
                CurrentUser.Email = user.Email;
                CurrentUser.Username = user.UserName;
                CurrentUser.ChildData = _context.ChildData.Where(c => c.Id == user.Id).FirstOrDefault();
                return JsonConvert.SerializeObject(CurrentUser);  
            }
            return JsonConvert.SerializeObject(result);
        }

        [EnableCors("AllAccessCors")]
        [HttpGet("claims")]
        public object Claims()
        {
            return User.Claims.Select(c =>
            new
            {
                Type = c.Type,
                Value = c.Value
            });
        }
    }
}