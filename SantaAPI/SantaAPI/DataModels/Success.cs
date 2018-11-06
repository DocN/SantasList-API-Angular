using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SantaAPI.DataModels
{
    public class Success
    {
        private const string SUCCESS_MSG_EDIT = "Successfully edited Child Data";
        private const string SUCCESS_MSG_DEL = "Successfully deleted Child Data";
        private const string SUCCESS_MSG_ADD = "Successfully added Child Data";
        public string Response { get; set; }
        public Success()
        {

        }

        public void SetSuccessEdit()
        {
            Response = SUCCESS_MSG_EDIT;
        }

        public void SetSuccessDel()
        {
            Response = SUCCESS_MSG_DEL;
        }

        public void SetSuccessAdd()
        {
            Response = SUCCESS_MSG_ADD;
        }
    }
}
