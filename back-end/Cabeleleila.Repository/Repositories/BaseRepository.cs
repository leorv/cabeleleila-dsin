using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cabeleleila.Domain.Contracts;
using Cabeleleila.Repository.Context;

namespace Cabeleleila.Repository.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        protected readonly CabeleleilaContext CabeleleilaContext;
        
    }
}