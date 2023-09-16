using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cabeleleila.Domain.Contracts;
using Cabeleleila.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Cabeleleila.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServiceController : ControllerBase
    {
        private readonly IServiceRepository _serviceRepository;
        private readonly ILogger<UserController> _logger;

        public ServiceController(IServiceRepository serviceRepository, ILogger<UserController> logger)
        {
            _serviceRepository = serviceRepository;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var services = _serviceRepository.GetAll();
                return Ok(services);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                var service = _serviceRepository.GetById(id);
                return Ok(service);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] Service service)
        {
            try
            {
                _serviceRepository.Add(service);
                return Created("api/services", service);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Service service)
        {
            try
            {
                Service existingService = _serviceRepository.GetById(id);

                existingService.Name = service.Name;
                existingService.Status = service.Status;

                _serviceRepository.Update(existingService);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var existingService = _serviceRepository.GetById(id);
                if (existingService == null)
                {
                    return BadRequest("Não há serviço com o id fornecido.");
                }

                _serviceRepository.Delete(existingService);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}