using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cabeleleila.Domain.Contracts;
using Cabeleleila.Domain.Entities;
using Cabeleleila.Repository.Context;

namespace Cabeleleila.Repository.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(CabeleleilaContext cabeleleilaContext) : base(cabeleleilaContext)
        {
        }

        public User GetUser(string email, string password) {
            return CabeleleilaContext.Users
                .FirstOrDefault(u => u.Email == email && u.Password == password);
        }

        public User GetByEmail(string email) {
            return CabeleleilaContext.Users
                .FirstOrDefault(u => u.Email == email);
        }
    }
}