using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cabeleleila.Domain.Contracts;
using Cabeleleila.Domain.Entities;
using Cabeleleila.Repository.Context;

namespace Cabeleleila.Repository.Repositories
{
    public class ServiceRepository : BaseRepository<Service>, IServiceRepository
    {
        public ServiceRepository(CabeleleilaContext cabeleleilaContext) : base(cabeleleilaContext)
        {
        }
    }
}