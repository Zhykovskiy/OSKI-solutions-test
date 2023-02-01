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
                .Take(5)
                .ToListAsync());
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetTestById([FromRoute] int id)
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
                        Description = q.Description,
                        Options = new string[] { q.Option1, q.Option2, q.Option3, q.Option4 },
                    }).ToList(),
                })
                .FirstOrDefault();

            return Ok(Test);
        }

        [HttpPost]
        [Route("Answers")]
        public IActionResult GetAnswers(int[] ids)
        {
            var answers = _dbContext.Questions
                .AsEnumerable()
                .Where(x => ids.Contains(x.Id))
                .OrderBy(x => Array.IndexOf(ids, x.Id))
                .Select(x => x.Answer)
                .ToArray();

            return Ok(answers);
        }
    }
}
