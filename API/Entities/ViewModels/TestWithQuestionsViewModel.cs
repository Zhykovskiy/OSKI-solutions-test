namespace API.Entities.ViewModels
{
    public class TestWithQuestionsViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<QuestionViewModel> Questions { get; set;}
    }
}
