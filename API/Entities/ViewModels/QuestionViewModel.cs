namespace API.Entities.ViewModels
{
    public class QuestionViewModel
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string[] Options { get; set; }
    }
}
