using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SantaAPI.Data;
using SantaAPI.DataModels;
using SantaAPI.ViewModels;

namespace SantaAPI.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class SantaListController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ApplicationDBContext _context;

        public SantaListController(ApplicationDBContext context, UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
            _context = context;
        }

        [EnableCors("AllAccessCors")]
        // GET api/values
        [HttpGet]
        public ActionResult<string> Get()
        {
            var allChildData = _context.ChildData.ToList();
            return JsonConvert.SerializeObject(allChildData);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<string>> GetAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            ChildData userChildData = _context.ChildData.Where(c=> c.Id == id).FirstOrDefault();
            if(userChildData != null)
            {
                UserData currentUserData = new UserData(user, userChildData);
                return JsonConvert.SerializeObject(currentUserData);
            }
            var error = new Error();
            error.UserDoesNotExist();
            return JsonConvert.SerializeObject(error);
        }

        // POST api/values
        [HttpPost]
        public ActionResult<string> Post([FromBody] ChildDataViewModel model)
        {   
            try
            {
                ChildData newChild = new ChildData();
                newChild.Id = model.Id;
                newChild.FirstName = model.FirstName;
                newChild.LastName = model.LastName;
                newChild.Street = model.Street;
                newChild.City = model.City;
                newChild.Province = model.Province;
                newChild.PostalCode = model.PostalCode;
                newChild.Country = model.Country;
                newChild.Latitude = model.Latitude;
                newChild.Longitude = model.Longitude;
                newChild.IsNaughty = model.IsNaughty;
                newChild.BirthDate = new DateTime(model.BirthYear, model.BirthMonth, model.BirthDay);
                newChild.DateTime = DateTime.Now;
                newChild.CreatedBy = Guid.NewGuid();
                _context.ChildData.Add(newChild);
                _context.SaveChanges();
                var successMsg = new Success();
                successMsg.SetSuccessAdd();
                return JsonConvert.SerializeObject(successMsg);
            } catch(Exception e)
            {
                Error msg = new Error();
                msg.UnableToAdd();
                return JsonConvert.SerializeObject(msg + " " + e.Message);
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public ActionResult<string> Put(string id, [FromBody] ChildDataViewModel model)
        {
            ChildData currentChildData = _context.ChildData.Where(c => c.Id == id).FirstOrDefault();
            if(currentChildData != null)
            {
                currentChildData.FirstName = model.FirstName;
                currentChildData.LastName = model.LastName;
                currentChildData.Street = model.Street;
                currentChildData.City = model.City;
                currentChildData.Province = model.Province;
                currentChildData.PostalCode = model.PostalCode;
                currentChildData.Country = model.Country;
                currentChildData.Latitude = model.Latitude;
                currentChildData.Longitude = model.Longitude;
                currentChildData.IsNaughty = model.IsNaughty;
                currentChildData.BirthDate = new DateTime(model.BirthYear, model.BirthMonth, model.BirthDay);
                _context.Update(currentChildData);
                _context.SaveChanges();
                Success msg = new Success();
                msg.SetSuccessEdit();
                return JsonConvert.SerializeObject(msg);
            }
            var errorMsg = new Error();
            errorMsg.UnableToEdit();
            return JsonConvert.SerializeObject(errorMsg);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public ActionResult<string> Delete(string id)
        {
            ChildData currentChild = _context.ChildData.Where(c => c.Id == id).FirstOrDefault();
            if(currentChild != null)
            {
                _context.ChildData.Remove(currentChild);
                _context.SaveChanges();
                var successmsg = new Success();
                successmsg.SetSuccessDel();
                return JsonConvert.SerializeObject(successmsg);
            }
            var msg = new Error();
            msg.UnableToDel();
            return JsonConvert.SerializeObject(msg);
        }

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