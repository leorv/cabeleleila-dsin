using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cabeleleila.Domain.Entities
{
    public class User : Entity
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public bool Administrator { get; set; }

        /// <summary>
        /// Um usuário pode ter 0 ou mais serviços agendados.
        /// </summary>
        public virtual ICollection<Service> Services { get; set; }

        public override void Validate()
        {
            if (string.IsNullOrEmpty(Email)) AddValidateMessages("Não foi informado e-mail.");
            if (string.IsNullOrEmpty(Name)) AddValidateMessages("Não foi informado nome do usuário.");
            if (string.IsNullOrEmpty(Password)) AddValidateMessages("Não foi informado a senha do usuário.");
        }
    }
}