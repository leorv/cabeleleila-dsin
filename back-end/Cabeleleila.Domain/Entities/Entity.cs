using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cabeleleila.Domain.Entities
{
    public abstract class Entity
    {
        private List<string> _messages { get; set; }
        private List<string> validateMessages
        {
            get { return _messages ?? (_messages = new List<string>()); }
        }

        public abstract void Validate();
        public bool IsValid
        {
            get { return !validateMessages.Any(); }
        }

        public string GetValidateMessages()
        {
            return string.Join(". ", validateMessages);
        }

        protected void ClearValidateMessages()
        {
            validateMessages.Clear();
        }

        protected void AddValidateMessages(string message)
        {
            validateMessages.Add(message);
        }
    }
}