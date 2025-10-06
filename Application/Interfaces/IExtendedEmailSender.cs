using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Application.Interfaces
{
    public interface IExtendedEmailSender: IEmailSender<User>
    {
        Task SendDeletionNoticeAsync(User user, string deletedItemTitle, string content);
    }
}