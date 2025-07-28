using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Steps.DTOs
{
    public class CreateStepDto
    {
        public int Order { get; set; }
        public required string Description { get; set; }
    }
}