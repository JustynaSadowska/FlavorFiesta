using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Email
{
    public class EmailConfiguration
    {
        public required string Host { get; set; }
        public int Port { get; set; }
        public required string UserName { get; set; }
        public required string Password { get; set; }
        public required string SenderEmail { get; set; }
        public required string SenderName { get; set; }
    }
}