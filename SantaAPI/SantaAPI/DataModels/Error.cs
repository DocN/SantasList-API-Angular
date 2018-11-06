using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SantaAPI.DataModels
{
    public class Error
    {
        public string Message { get; set; }

        private const string NO_TOKEN_USER = "No user in Token";
        private const string USER_DOES_NOT_EXIST = "Error User ID Does Not Exist";
        private const string UNABLE_TO_EDIT = "Error unable to edit Child Data";
        private const string UNABLE_TO_DEL = "Error unable to delete child data";
        private const string UNABLE_TO_ADD = "Error unable to add new child data";
        public Error() { }
        public Error(string _message)
        {
            this.Message = _message;
        }

        public void SetNoUser()
        {
            Message = NO_TOKEN_USER;
        }

        public void UserDoesNotExist()
        {
            Message = USER_DOES_NOT_EXIST;
        }

        public void UnableToEdit()
        {
            Message = UNABLE_TO_EDIT;
        }

        public void UnableToDel()
        {
            Message = UNABLE_TO_DEL;
        }

        public void UnableToAdd()
        {
            Message = UNABLE_TO_ADD;
        }
        
    }
}
