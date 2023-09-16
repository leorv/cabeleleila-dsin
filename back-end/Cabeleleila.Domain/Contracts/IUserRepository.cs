using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cabeleleila.Domain.Entities;

namespace Cabeleleila.Domain.Contracts
{
    public interface IUserRepository : IBaseRepository<User>
    {
        
    }
}