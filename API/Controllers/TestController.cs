using API.Data;
using API.Entities.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public TestController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult> GetTests()
        {
            return Ok(await _dbContext.Tests
                .OrderBy(x => Guid.NewGuid())
                .ToListAsync());
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetTestById([FromRoute] int id)
        {
            var Test = _dbContext.Tests
                .Include(x => x.Questions)
                .Where(x => x.Id == id)
                .Select(x => new TestWithQuestionsViewModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Questions = x.Questions.Select(q => new QuestionViewModel
                    {
                        Id = q.Id,
                        Options = new string[] { q.Option1, q.Option2, q.Option3, q.Option4 },
                        Answer = q.Answer
                    }).ToList(),
                });

            return Ok(Test);
        }
    }
}
