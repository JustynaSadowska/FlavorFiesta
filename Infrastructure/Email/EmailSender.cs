using System;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;

namespace Infrastructure.Email;

public class EmailSender(IConfiguration config) : IEmailSender<User>
{
    public async Task SendConfirmationLinkAsync(User user, string email, string confirmationLink)
    {
        var subject = "Confirm your email address";
        var body = $@"
            <p>Hi {user.FirstName} {user.LastName}</p>
            <p>Please confirm your email by clicking the link below:</p>
            <p><a href='{confirmationLink}'>Click here to verify email</a></p>
            <p>Thank you!</p>
        ";

        await SendMailAsync(email, subject, body);
    }

    public async Task SendPasswordResetCodeAsync(User user, string email, string resetCode)
    {
        var subject = "Reset your password";
        var body = $@"
            <p>Hi {user.FirstName} {user.LastName}</p>
            <p>Please click this link to reset your password</p>
            <p><a href='{config["ClientAppUrl"]}/reset-password?email={email}&code={resetCode}'>
                Click to reset your password</a>
            </p>
            <p>If you did not request this, you can ignore this email
            </p>       
            ";

        await SendMailAsync(email, subject, body);
    }

    public Task SendPasswordResetLinkAsync(User user, string email, string resetLink)
    {
        throw new NotImplementedException();
    }

    private async Task SendMailAsync(string recipient, string subject, string body)
    {
        var host = config["Smtp:Host"];
        var port = int.Parse(config["Smtp:Port"]!);
        var user = config["Smtp:User"];
        var password = config["Smtp:Password"];
        var senderEmail = config["Smtp:SenderEmail"];
        var senderName = config["Smtp:SenderName"];

        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(senderName, senderEmail));
        message.To.Add(new MailboxAddress("", recipient));
        message.Subject = subject;
        message.Body = new BodyBuilder { HtmlBody = body }.ToMessageBody();

        using var client = new SmtpClient();
        await client.ConnectAsync(host, port, SecureSocketOptions.StartTls);
        client.AuthenticationMechanisms.Remove("XOAUTH2");
        await client.AuthenticateAsync(user, password);
        await client.SendAsync(message);
        await client.DisconnectAsync(true);
    }
}
