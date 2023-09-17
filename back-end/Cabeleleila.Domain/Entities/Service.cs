using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cabeleleila.Domain.Entities
{
    public class Service : Entity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public DateTime RequestDate { get; set; }
        public DateTime ScheduledDate { get; set; }
        public string Status { get; set; }
        public int UserId { get; set; }

        public override void Validate()
        {
            try
            {
                if (Name.Length == 0) AddValidateMessages("Serviço não possui nome.");
                if (Status.Length == 0) AddValidateMessages("Serviço não possui status.");
            }
            catch (NullReferenceException)
            {
                AddValidateMessages("Serviço possui um valor nulo.");
            }
        }

    }
}