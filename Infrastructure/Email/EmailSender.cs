using System;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;

namespace Infrastructure.Email;

public class EmailSender(IOptions<EmailConfiguration> emailConfig, IConfiguration config) : IEmailSender<User>
{
    private readonly EmailConfiguration _emailConfig = emailConfig.Value;
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

        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(_emailConfig.SenderName, _emailConfig.SenderEmail));
        message.To.Add(new MailboxAddress("", recipient));
        message.Subject = subject;
        message.Body = new BodyBuilder { HtmlBody = body }.ToMessageBody();
        
        try
        {
            using var client = new SmtpClient();
            await client.ConnectAsync(_emailConfig.Host, _emailConfig.Port, SecureSocketOptions.StartTls);
            client.AuthenticationMechanisms.Remove("XOAUTH2");
            await client.AuthenticateAsync(_emailConfig.UserName, _emailConfig.Password);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("Could not send email", ex);
        }
    }
}
