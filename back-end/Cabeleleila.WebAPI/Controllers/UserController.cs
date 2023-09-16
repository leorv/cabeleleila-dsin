using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cabeleleila.Domain.Contracts;
using Cabeleleila.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Migrations.Operations;

namespace Cabeleleila.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ILogger<UserController> _logger;

        public UserController(IUserRepository userRepository, ILogger<UserController> logger)
        {
            _userRepository = userRepository;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var users = _userRepository.GetAll();
                return Ok(users);
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
                var user = _userRepository.GetById(id);
                return Ok(user);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] User user)
        {
            try
            {
                var existingUser = _userRepository.GetByEmail(user.Email);
                if (existingUser != null)
                {
                    return BadRequest("Já existe um usuário cadastrado com este e-mail.");
                }

                _userRepository.Add(user);
                return Created("api/users", user);
            } catch (Exception e) {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] User user)
        {
            try
            {
                User existingUser = _userRepository.GetUser(user.Email, user.Password);

                existingUser.Name = user.Name;
                existingUser.Lastname = user.Lastname;

                _userRepository.Update(existingUser);
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
                var existingUser = _userRepository.GetById(id);
                if (existingUser == null)
                {
                    return BadRequest("Não há usuário com o id fornecido.");
                }

                _userRepository.Delete(existingUser);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("VerificarUsuario")]
        public ActionResult Verify([FromBody] User user)
        {
            try
            {
                var existingUser = _userRepository.GetUser(user.Email, user.Password);
                if (existingUser != null)
                    return Ok(existingUser);
                return BadRequest("Usuário ou senha inválidos.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


    }
}