package com.example.conversoBackend.auth;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SIGNUP EMAIL
    // ─────────────────────────────────────────────────────────────────────────
    public void sendSignupEmail(String toEmail, String name) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setSubject("Welcome to CONVERSO — Your Tenant Is Ready");
            helper.setText(buildSignupEmailHtml(name), true); // true = isHtml

            mailSender.send(message);
        } catch (MessagingException e) {
            System.err.println("Failed to send signup email: " + e.getMessage());
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // LOGIN EMAIL
    // ─────────────────────────────────────────────────────────────────────────
    @Async
    public void sendLoginEmail(String toEmail, String name) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setSubject("CONVERSO — New Sign-In Detected");
            helper.setText(buildLoginEmailHtml(name), true); // true = isHtml

            mailSender.send(message);
        } catch (MessagingException e) {
            System.err.println("Failed to send login email: " + e.getMessage());
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // TEMPLATE: SIGNUP
    // ─────────────────────────────────────────────────────────────────────────
    private String buildSignupEmailHtml(String name) {
        return """
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8"/>
          <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
          <title>Welcome to CONVERSO</title>
        </head>
        <body style="margin:0;padding:0;background-color:#09090B;font-family:Arial,sans-serif;">

          <div style="display:none;max-height:0;overflow:hidden;color:#09090B;">
            Your tenant has been created. You're ready to deploy CONVERSO.
          </div>

          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#09090B;padding:40px 16px;">
            <tr><td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

                <!-- LOGO -->
                <tr>
                  <td style="padding-bottom:32px;">
                    <table cellpadding="0" cellspacing="0"><tr>
                      <td style="background-color:#FACC15;width:36px;height:36px;text-align:center;vertical-align:middle;">
                        <div style="width:14px;height:14px;background-color:#09090B;margin:11px auto;"></div>
                      </td>
                      <td style="padding-left:12px;">
                        <span style="font-family:Arial Black,Arial,sans-serif;font-weight:900;font-size:18px;color:#FFFFFF;letter-spacing:0.2em;text-transform:uppercase;">CONVERSO</span>
                      </td>
                    </tr></table>
                  </td>
                </tr>

                <!-- YELLOW HERO -->
                <tr>
                  <td style="background-color:#FACC15;padding:48px 40px;">
                    <table width="100%" cellpadding="0" cellspacing="0"><tr>
                      <td>
                        <p style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.3em;text-transform:uppercase;color:#000;margin:0 0 20px 0;">— New Account</p>
                        <h1 style="font-family:Arial Black,Arial,sans-serif;font-weight:900;font-size:52px;line-height:1;color:#000;margin:0;text-transform:uppercase;letter-spacing:-1px;">WELCOME<br/>ABOARD.</h1>
                      </td>
                      <td width="80" valign="bottom" align="right">
                        <span style="font-family:Arial Black,Arial,sans-serif;font-weight:900;font-size:96px;color:rgba(0,0,0,0.08);line-height:1;display:block;">01</span>
                      </td>
                    </tr></table>
                  </td>
                </tr>

                <!-- CONTENT -->
                <tr>
                  <td style="background-color:#18181B;border:1px solid #27272A;border-top:none;padding:40px;">

                    <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #27272A;padding-bottom:24px;margin-bottom:24px;"><tr><td>
                      <p style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:#71717A;margin:0 0 8px 0;">01 — RECIPIENT</p>
                      <p style="font-family:Arial Black,Arial,sans-serif;font-weight:900;font-size:22px;color:#FFF;text-transform:uppercase;margin:0;letter-spacing:0.05em;">
                """ + name + """
                      </p>
                    </td></tr></table>

                    <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #27272A;padding-bottom:24px;margin-bottom:24px;"><tr><td>
                      <p style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:#71717A;margin:0 0 12px 0;">02 — MESSAGE</p>
                      <p style="font-family:Arial,sans-serif;font-size:14px;color:#A1A1AA;line-height:1.7;margin:0;">
                        Your CONVERSO tenant has been successfully created. You're now ready to deploy AI-powered customer support trained on your website content.
                      </p>
                    </td></tr></table>

                    <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #27272A;padding-bottom:24px;margin-bottom:32px;"><tr><td>
                      <p style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:#71717A;margin:0 0 12px 0;">03 — STATUS</p>
                      <table cellpadding="0" cellspacing="0"><tr>
                        <td style="background-color:#FACC15;padding:6px 14px;">
                          <span style="font-family:Arial Black,Arial,sans-serif;font-weight:900;font-size:11px;color:#09090B;text-transform:uppercase;letter-spacing:0.2em;">TENANT ACTIVE</span>
                        </td>
                      </tr></table>
                    </td></tr></table>

                    <table cellpadding="0" cellspacing="0"><tr>
                      <td style="background-color:#FACC15;">
                        <a href="#" style="display:block;font-family:Arial Black,Arial,sans-serif;font-weight:900;font-size:14px;color:#09090B;text-transform:uppercase;letter-spacing:0.2em;padding:18px 36px;text-decoration:none;">
                          GO TO DASHBOARD →
                        </a>
                      </td>
                    </tr></table>

                  </td>
                </tr>

                <!-- FEATURE STRIP -->
                <tr>
                  <td style="background-color:#09090B;border:1px solid #27272A;border-top:none;">
                    <table width="100%" cellpadding="0" cellspacing="0"><tr>
                      <td width="33%" style="padding:24px;border-right:1px solid #27272A;">
                        <p style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#FACC15;margin:0 0 4px 0;">⚡ INSTANT</p>
                        <p style="font-family:Arial,sans-serif;font-size:10px;color:#52525B;letter-spacing:0.1em;text-transform:uppercase;margin:0;">Responses</p>
                      </td>
                      <td width="33%" style="padding:24px;border-right:1px solid #27272A;">
                        <p style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#FACC15;margin:0 0 4px 0;">🔒 SECURE</p>
                        <p style="font-family:Arial,sans-serif;font-size:10px;color:#52525B;letter-spacing:0.1em;text-transform:uppercase;margin:0;">& Private</p>
                      </td>
                      <td width="33%" style="padding:24px;">
                        <p style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#FACC15;margin:0 0 4px 0;">🌐 24/7</p>
                        <p style="font-family:Arial,sans-serif;font-size:10px;color:#52525B;letter-spacing:0.1em;text-transform:uppercase;margin:0;">Availability</p>
                      </td>
                    </tr></table>
                  </td>
                </tr>

                <!-- FOOTER -->
                <tr>
                  <td style="padding-top:32px;">
                    <div style="width:100%;height:1px;background-color:#27272A;margin-bottom:20px;"></div>
                    <p style="font-family:Arial,sans-serif;font-size:10px;color:#3F3F46;letter-spacing:0.2em;text-transform:uppercase;margin:0;">© 2025  CONVERSO PLATFORM — ALL RIGHTS RESERVED</p>
                    <p style="font-family:Arial,sans-serif;font-size:10px;color:#3F3F46;margin:6px 0 0 0;letter-spacing:0.1em;text-transform:uppercase;">You're receiving this because you signed up at CONVERSO.app</p>
                  </td>
                </tr>

              </table>
            </td></tr>
          </table>
        </body>
        </html>
        """;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // TEMPLATE: LOGIN
    // ─────────────────────────────────────────────────────────────────────────
    private String buildLoginEmailHtml(String name) {
        return """
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8"/>
          <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
          <title>New Sign-In — CONVERSO</title>
        </head>
        <body style="margin:0;padding:0;background-color:#09090B;font-family:Arial,sans-serif;">

          <div style="display:none;max-height:0;overflow:hidden;color:#09090B;">
            A new sign-in was detected on your CONVERSO account. If this wasn't you, act now.
          </div>

          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#09090B;padding:40px 16px;">
            <tr><td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

                <!-- LOGO -->
                <tr>
                  <td style="padding-bottom:32px;">
                    <table cellpadding="0" cellspacing="0"><tr>
                      <td style="background-color:#FACC15;width:36px;height:36px;text-align:center;vertical-align:middle;">
                        <div style="width:14px;height:14px;background-color:#09090B;margin:11px auto;"></div>
                      </td>
                      <td style="padding-left:12px;">
                        <span style="font-family:Arial Black,Arial,sans-serif;font-weight:900;font-size:18px;color:#FFFFFF;letter-spacing:0.2em;text-transform:uppercase;">CONVERSO</span>
                      </td>
                    </tr></table>
                  </td>
                </tr>

                <!-- DARK HERO -->
                <tr>
                  <td style="background-color:#18181B;border:2px solid #27272A;padding:48px 40px;">
                    <table width="100%" cellpadding="0" cellspacing="0"><tr>
                      <td>
                        <p style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.3em;text-transform:uppercase;color:#71717A;margin:0 0 20px 0;">— Security Notice</p>
                        <h1 style="font-family:Arial Black,Arial,sans-serif;font-weight:900;font-size:52px;line-height:1;color:#FFF;margin:0;text-transform:uppercase;letter-spacing:-1px;">WELCOME<br/><span style="color:#FACC15;">BACK.</span></h1>
                      </td>
                      <td width="80" valign="bottom" align="right">
                        <span style="font-family:Arial Black,Arial,sans-serif;font-weight:900;font-size:96px;color:rgba(255,255,255,0.03);line-height:1;display:block;">02</span>
                      </td>
                    </tr></table>
                  </td>
                </tr>

                <!-- CONTENT -->
                <tr>
                  <td style="background-color:#18181B;border:1px solid #27272A;border-top:none;padding:40px;">

                    <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #27272A;padding-bottom:24px;margin-bottom:24px;"><tr><td>
                      <p style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:#71717A;margin:0 0 8px 0;">01 — RECIPIENT</p>
                      <p style="font-family:Arial Black,Arial,sans-serif;font-weight:900;font-size:22px;color:#FFF;text-transform:uppercase;margin:0;letter-spacing:0.05em;">
                """ + name + """
                      </p>
                    </td></tr></table>

                    <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #27272A;padding-bottom:24px;margin-bottom:24px;"><tr><td>
                      <p style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:#71717A;margin:0 0 12px 0;">02 — MESSAGE</p>
                      <p style="font-family:Arial,sans-serif;font-size:14px;color:#A1A1AA;line-height:1.7;margin:0;">
                        A successful sign-in was detected on your CONVERSO account. You're all set and ready to manage your AI support bot.
                      </p>
                    </td></tr></table>

                    <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #27272A;padding-bottom:24px;margin-bottom:24px;"><tr><td>
                      <p style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:#71717A;margin:0 0 12px 0;">03 — EVENT</p>
                      <table cellpadding="0" cellspacing="0"><tr>
                        <td style="background-color:#FACC15;padding:6px 14px;">
                          <span style="font-family:Arial Black,Arial,sans-serif;font-weight:900;font-size:11px;color:#09090B;text-transform:uppercase;letter-spacing:0.2em;">SIGN-IN DETECTED</span>
                        </td>
                      </tr></table>
                    </td></tr></table>

                    <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #27272A;padding-bottom:24px;margin-bottom:32px;"><tr><td>
                      <table width="100%" cellpadding="0" cellspacing="0"><tr>
                        <td width="3" style="background-color:#FACC15;">&nbsp;</td>
                        <td style="padding:12px 16px;">
                          <p style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#71717A;margin:0 0 4px 0;">04 — SECURITY NOTE</p>
                          <p style="font-family:Arial,sans-serif;font-size:12px;color:#71717A;line-height:1.6;margin:0;letter-spacing:0.05em;text-transform:uppercase;">
                            If this wasn't you, reset your password immediately to secure your account.
                          </p>
                        </td>
                      </tr></table>
                    </td></tr></table>

                    <table cellpadding="0" cellspacing="0"><tr>
                      <td style="background-color:#FACC15;padding-right:2px;">
                        <a href="#" style="display:block;font-family:Arial Black,Arial,sans-serif;font-weight:900;font-size:13px;color:#09090B;text-transform:uppercase;letter-spacing:0.2em;padding:16px 28px;text-decoration:none;white-space:nowrap;">OPEN DASHBOARD →</a>
                      </td>
                      <td style="border:1px solid #3F3F46;">
                        <a href="#" style="display:block;font-family:Arial Black,Arial,sans-serif;font-weight:900;font-size:13px;color:#71717A;text-transform:uppercase;letter-spacing:0.2em;padding:16px 28px;text-decoration:none;white-space:nowrap;">RESET PASSWORD</a>
                      </td>
                    </tr></table>

                  </td>
                </tr>

                <!-- FOOTER -->
                <tr>
                  <td style="padding-top:32px;">
                    <div style="width:100%;height:1px;background-color:#27272A;margin-bottom:20px;"></div>
                    <p style="font-family:Arial,sans-serif;font-size:10px;color:#3F3F46;letter-spacing:0.2em;text-transform:uppercase;margin:0;">© 2025 CONVERSO PLATFORM — ALL RIGHTS RESERVED</p>
                    <p style="font-family:Arial,sans-serif;font-size:10px;color:#3F3F46;margin:6px 0 0 0;letter-spacing:0.1em;text-transform:uppercase;">You're receiving this because you have a CONVERSO account.</p>
                  </td>
                </tr>

              </table>
            </td></tr>
          </table>
        </body>
        </html>
        """;
    }
}