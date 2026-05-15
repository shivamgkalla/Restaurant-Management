import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from app.core.config import settings


def send_otp_email(otp_code: str, action_type: str, reference_id: int) -> None:
    """
    Send OTP email to admin via Gmail SMTP.
    Called just before saving OTP to DB.
    """
    action_labels = {
        "edit_order":     "Edit Order",
        "cancel_order":   "Cancel Order",
        "apply_discount": "Apply Discount",
    }
    action_label = action_labels.get(action_type, action_type)

    subject = f"OTP Verification — {action_label} (Ref #{reference_id})"

    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 24px;
                border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #d9534f;">OTP Verification Required</h2>
        <p>A staff member is requesting to perform the following action:</p>
        <table style="width:100%; margin: 16px 0;">
            <tr>
                <td><strong>Action:</strong></td>
                <td>{action_label}</td>
            </tr>
            <tr>
                <td><strong>Reference ID:</strong></td>
                <td>#{reference_id}</td>
            </tr>
        </table>
        <p>Your OTP is:</p>
        <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px;
                    color: #d9534f; text-align: center; padding: 16px;
                    background: #fff5f5; border-radius: 6px;">
            {otp_code}
        </div>
        <p style="color: #888; font-size: 13px; margin-top: 16px;">
            This OTP is valid for <strong>{settings.OTP_EXPIRE_MINUTES} minutes</strong>.
            Do not share it with anyone.
        </p>
        <p style="color: #888; font-size: 13px;">
            If you did not request this, please contact your system administrator immediately.
        </p>
    </div>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"]    = settings.SMTP_USERNAME
    msg["To"]      = settings.ADMIN_EMAIL
    msg.attach(MIMEText(html_body, "html"))

    with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
        server.ehlo()
        server.starttls()
        server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
        server.sendmail(settings.SMTP_USERNAME, settings.ADMIN_EMAIL, msg.as_string())