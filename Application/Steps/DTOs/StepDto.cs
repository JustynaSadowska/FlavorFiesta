using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Steps.DTOs
{
    public class StepDto
    {
        public required string Id { get; set; }
        public required string Description { get; set; }
    }
}