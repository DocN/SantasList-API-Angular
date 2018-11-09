using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SantaAPI.Data;
using SantaAPI.DataModels;
using SantaAPI.ViewModels;


namespace SantaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDBContext _context;
        private const bool DEFAULT_NAUGHTY = false;

        public AuthController(ApplicationDBContext context, UserManager<IdentityUser> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
            _context = context;
        }
        //register
        [EnableCors("AllAccessCors")]
        [HttpPost]
        public async Task<ActionResult> InsertUser([FromBody] RegisterViewModel model)
        {
            try
            {
                Guid newGuid = Guid.NewGuid();
                var user = new IdentityUser
                {
                    Email = model.Email,
                    UserName = model.Username,
                    SecurityStamp = newGuid.ToString(),
                };
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, "Child");
                }

                ChildData currentChild = getChildData(model, user.Id, newGuid);
                _context.Add(currentChild);
                await _context.SaveChangesAsync();
                return Ok(new { Username = user.UserName, response=true });
            } catch (Exception e)
            {
                return Ok(new { Error = e.Message, response=false });
            }
        }

        private ChildData getChildData(RegisterViewModel model, string userid, Guid newGuid)
        {
            ChildData currentChildData = new ChildData();
            currentChildData.FirstName = model.FirstName;
            currentChildData.LastName = model.LastName;
            currentChildData.Street = model.Street;
            currentChildData.City = model.City;
            currentChildData.Province = model.Province;
            currentChildData.PostalCode = model.PostalCode;
            currentChildData.Country = model.Country;
            currentChildData.Latitude = model.Latitude;
            currentChildData.Longitude = model.Longitude;
            Debug.WriteLine(model.FirstName);
            currentChildData.BirthDate = new DateTime(model.BirthYear, model.BirthMonth, model.BirthDay);
            currentChildData.DateTime = DateTime.Now;
            currentChildData.IsNaughty = DEFAULT_NAUGHTY;
            currentChildData.Id = userid;
            currentChildData.CreatedBy = newGuid;
            return currentChildData;
        }

        [EnableCors("AllAccessCors")]
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginViewModel model)
        {
            Debug.WriteLine("here" + model.Username);
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var claim = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                };
                ClaimsIdentity claimsIdentity = new ClaimsIdentity(claim, "Token");
                var userRoles = await _userManager.GetRolesAsync(user);

                foreach(var role in userRoles)
                {
                    claimsIdentity.AddClaim(new Claim(ClaimTypes.Role, role));
                }
                
                var signinKey = new SymmetricSecurityKey(
                  Encoding.UTF8.GetBytes(_configuration["Jwt:SigningKey"]));

                int expiryInMinutes = Convert.ToInt32(_configuration["Jwt:ExpiryInMinutes"]);

                var token = new JwtSecurityToken(
                  issuer: _configuration["Jwt:Site"],
                  audience: _configuration["Jwt:Site"],
                  claims: claimsIdentity.Claims,
                  expires: DateTime.UtcNow.AddMinutes(expiryInMinutes),
                  signingCredentials: new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256)
                );

                return Ok(
                  new
                  {
                      token = new JwtSecurityTokenHandler().WriteToken(token),
                      expiration = token.ValidTo
                  });
            }
            return Unauthorized();
        }
    }
}