using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;

namespace Application.Profiles.Queries
{
    public class UserParams : PaginationParams<DateTime?>
    {
        public string? Name { get; set; }
    }
}