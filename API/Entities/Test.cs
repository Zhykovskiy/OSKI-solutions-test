﻿namespace API.Entities
{
    public class Test
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public ICollection<Question> Questions { get; set; }
    }
}
