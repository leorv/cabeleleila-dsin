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

        public BaseRepository(CabeleleilaContext cabeleleilaContext) {
            CabeleleilaContext = cabeleleilaContext;
        }

        public void Add(T entity)
        {
            CabeleleilaContext.Set<T>().Add(entity);
            CabeleleilaContext.SaveChanges();
        }

        public void Delete(T entity)
        {
            CabeleleilaContext.Set<T>().Remove(entity);
            CabeleleilaContext.SaveChanges();
        }

        public void Dispose()
        {
            CabeleleilaContext.Dispose();
        }

        public IEnumerable<T> GetAll()
        {
            return CabeleleilaContext.Set<T>().ToList();
        }

        public T GetById(int id)
        {
            return CabeleleilaContext.Set<T>().Find(id);
        }

        public void Update(T entity)
        {
            CabeleleilaContext.Set<T>().Update(entity);
            CabeleleilaContext.SaveChanges();
        }
    }
}