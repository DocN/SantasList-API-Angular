using System;
using System.Collections.Generic;
using System.Diagnostics;
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

        [EnableCors("AllAccessCors")]
        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<string>> GetAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            ChildData userChildData = _context.ChildData.Where(c => c.Id == id).FirstOrDefault();
            if (userChildData != null)
            {
                UserData currentUserData = new UserData(user, userChildData);
                return JsonConvert.SerializeObject(currentUserData);
            }
            var error = new Error();
            error.UserDoesNotExist();
            return JsonConvert.SerializeObject(error);
        }

        // POST api/values
        [EnableCors("AllAccessCors")]
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
            }
            catch (Exception e)
            {
                Error msg = new Error();
                msg.UnableToAdd();
                return JsonConvert.SerializeObject(msg + " " + e.Message);
            }
        }

        // PUT api/values/5
        [EnableCors("AllAccessCors")]
        [HttpPut("{id}")]
        public ActionResult<string> Put(string id, [FromBody] ChildDataViewModel model)
        {
            ChildData currentChildData = _context.ChildData.Where(c => c.Id == id).FirstOrDefault();
            if (currentChildData != null)
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
        [EnableCors("AllAccessCors")]
        [HttpDelete("{id}")]
        public ActionResult<string> Delete(string id)
        {
            ChildData currentChild = _context.ChildData.Where(c => c.Id == id).FirstOrDefault();
            if (currentChild != null)
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

        [EnableCors("AllAccessCors")]
        [HttpGet("editChild/{id}")]
        public async Task<ActionResult<string>> getEditChildAsync(string id)
        {
            ChildData currentChildData = _context.ChildData.Where(c => c.Id.Equals(id)).FirstOrDefault();
            if (currentChildData == null)
            {
                Error newError = new Error();
                newError.UnableToEditChilData();
                return Ok(new { response = newError.Message });
            }
            IdentityUser currentUser = await _userManager.FindByIdAsync(id);
            EditChild currentEditChild = new EditChild();
            if (currentUser != null)
            {
                currentEditChild.Email = currentUser.Email;
                currentEditChild.UID = currentUser.Id;
                currentEditChild.Username = currentUser.UserName;
            }
            currentEditChild.myChildData = currentChildData;
            currentEditChild.BirthDay = currentChildData.BirthDate.Day;
            currentEditChild.BirthMonth = currentChildData.BirthDate.Month;
            currentEditChild.BirthYear = currentChildData.BirthDate.Year;
            return JsonConvert.SerializeObject(currentEditChild);
        }

        [EnableCors("AllAccessCors")]
        [HttpPut("editChild")]
        public ActionResult<string> submitEditChild([FromBody] EditChildViewModel model)
        {
            ChildData currentChild = _context.ChildData.Where(c => c.Id.Equals(model.Uid)).FirstOrDefault();
            if (currentChild == null)
            {
                return Ok(new { response = "Error no child data to edit" });
            }

            currentChild.FirstName = model.Firstname;
            currentChild.LastName = model.Lastname;
            currentChild.Street = model.Street;
            currentChild.City = model.City;
            currentChild.Province = model.Province;
            currentChild.PostalCode = model.PostalCode;
            currentChild.Country = model.Country;
            currentChild.Latitude = model.Latitude;
            currentChild.Longitude = model.Longitude;
            DateTime newBirth = new DateTime(model.BirthYear, model.BirthMonth, model.BirthDay);
            Debug.WriteLine("wowdude" + model.BirthYear);
            currentChild.BirthDate = newBirth;
            _context.ChildData.Update(currentChild);
            _context.SaveChanges();
            return Ok(new { response = "Successfully Updated Child Data" });
        }

        [EnableCors("AllAccessCors")]
        [HttpPost("naughty/{id}")]
        public ActionResult<string> editNaughty(string id, [FromBody] EditNaughtyViewModel model)
        {
            ChildData currentChild = _context.ChildData.Where(c => c.Id.Equals(id)).FirstOrDefault();
            if (currentChild != null)
            {
                currentChild.IsNaughty = model.IsNaughty;
                _context.ChildData.Update(currentChild);
                _context.SaveChanges();
                return Ok(new { response = "Successfully updated naughty status " });
            }
            return Ok(new { response = "Failed to update naughty status" });
        }

        [EnableCors("AllAccessCors")]
        [HttpPost("addChildData/{id}")]
        public ActionResult<string> addChildData(string id, [FromBody] AddChildDataViewModel model)
        {
            ChildData newChildData = new ChildData();
            newChildData.FirstName = model.FirstName;
            newChildData.LastName = model.LastName;
            newChildData.Street = model.Street;
            newChildData.City = model.City;
            newChildData.Province = model.Province;
            newChildData.PostalCode = model.PostalCode;
            newChildData.Country = model.Country;
            newChildData.Latitude = model.Latitude;
            newChildData.Longitude = model.Longitude;
            DateTime birthday = new DateTime(model.BirthYear, model.BirthMonth, model.BirthDay);
            newChildData.BirthDate = birthday;
            newChildData.Id = id;
            _context.ChildData.Add(newChildData);
            _context.SaveChanges();
            return Ok(new { response = "successfully added new child data" });
        }

        [EnableCors("AllAccessCors")]
        [HttpGet("childrenWithoutData")]
        public ActionResult<string> getChildrenWithoutData()
        {
            var allUsers = _context.Users.ToList();
            var allChildData = _context.ChildData.ToList();
            List<UserSimplifiedData> usersThatNeedContact = new List<UserSimplifiedData>();
            foreach(var currentUser in allUsers)
            {
                bool found = false;
                foreach(var currentChildData in allChildData)
                {
                    if(currentChildData.Id.Equals(currentUser.Id))
                    {
                        found = true;
                        break;
                    }
                }
                if(found == false)
                {
                    UserSimplifiedData simplified = new UserSimplifiedData();
                    simplified.Email = currentUser.Email;
                    simplified.UID = currentUser.Id;
                    simplified.Username = currentUser.UserName;
                    usersThatNeedContact.Add(simplified);
                }
            }
            return JsonConvert.SerializeObject(usersThatNeedContact);
        }
    }
}