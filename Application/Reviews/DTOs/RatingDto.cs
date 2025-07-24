using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Reviews.DTOs
{
    public class RatingDto
    {
        public double AverageRating { get; set; }
        public int ReviewCount { get; set; }
    }
}