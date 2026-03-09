import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: process.env.EMAIL_PORT || 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
        user: process.env.EMAIL_USER || "sledgevortx@gmail.com",
        pass: process.env.EMAIL_PASS || "vypw qzcp irut oivc",
    },
});

// Professional Payment Verification Email Template
export const sendPaymentVerificationEmail = async (registration) => {
    // Extract data from registration object
    const userEmail = registration.email;
    const userName = registration.fullName;
    const gamingName = registration.gamingName;
    const city = registration.city;
    const transactionId = registration._id;
    const tournamentName = registration.tournamentId?.title || 'Tournament';
    const paymentDate = new Date(registration.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
    const status = registration.paymentStatus; // 'pending' or 'verified'

    const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Verification - Vortx Esports</title>
    <style>
        /* Base Styles */
        body { margin: 0; padding: 0; font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; background-color: #09090b; color: #e4e4e7; -webkit-font-smoothing: antialiased; line-height: 1.6; }
        table { border-collapse: separate; border-spacing: 0; width: 100%; }
        
        /* Container */
        .wrapper { width: 100%; table-layout: fixed; background-color: #09090b; padding-bottom: 60px; }
        .main-table { background-color: #18181b; margin: 0 auto; width: 100%; max-width: 600px; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4); border: 1px solid #27272a; }
        
        /* Header */
        .header { background: linear-gradient(180deg, #18181b 0%, #09090b 100%); padding: 40px 30px; text-align: center; border-bottom: 1px solid #27272a; }
        .header h1 { margin: 0; color: #ffffff; font-size: 24px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; background: linear-gradient(to right, #a78bfa, #c4b5fd); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .subtitle { margin-top: 8px; font-size: 11px; color: #71717a; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600; }

        /* Content */
        .content { padding: 48px 40px; }
        
        /* Status Badge */
        .status-container { text-align: center; margin-bottom: 32px; }
        .status-badge { display: inline-block; padding: 10px 20px; border-radius: 4px; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }
        .status-verified { background-color: rgba(5, 150, 105, 0.1); color: #34d399; border: 1px solid rgba(5, 150, 105, 0.3); }
        .status-pending { background-color: rgba(217, 119, 6, 0.1); color: #fbbf24; border: 1px solid rgba(217, 119, 6, 0.3); }
        
        /* Typography */
        h2 { margin: 0 0 16px; color: #f4f4f5; font-size: 22px; font-weight: 600; text-align: center; }
        p { margin: 0 0 32px; color: #a1a1aa; font-size: 15px; text-align: center; max-width: 480px; margin-left: auto; margin-right: auto; }
        
        /* Details Section */
        .details-wrapper { background-color: #1c1c1f; border-radius: 8px; border: 1px solid #27272a; margin-top: 40px; }
        .details-table { width: 100%; border-collapse: collapse; }
        .details-cell { padding: 22px 28px; border-bottom: 1px solid #27272a; }
        .details-row:last-child .details-cell { border-bottom: none; }
        .label { color: #71717a; font-weight: 500; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 35%; vertical-align: top; }
        .value { color: #f4f4f5; font-weight: 600; text-align: right; font-size: 14px; width: 65%; word-break: break-all; }
        
        /* Typography */
        h2 { margin: 0 0 24px; color: #ffffff; font-size: 26px; font-weight: 700; text-align: center; letter-spacing: -0.5px; }
        p { margin: 0 0 36px; color: #a1a1aa; font-size: 16px; text-align: center; max-width: 500px; margin-left: auto; margin-right: auto; line-height: 1.7; }
        
        /* Buttons */
        .btn-container { text-align: center; margin-top: 44px; }
        .btn { display: inline-block; background: #7c3aed; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; transition: all 0.2s; font-size: 15px; letter-spacing: 0.5px; box-shadow: 0 10px 15px -3px rgba(124, 58, 237, 0.25); }
        .btn:hover { background: #6d28d9; transform: translateY(-1px); }
        
        /* Footer */
        .footer { padding: 40px 20px; text-align: center; background-color: #09090b; }
        .footer-text { margin: 0 0 10px; color: #52525b; font-size: 12px; }
        .footer-links { margin: 20px 0 0; }
        .footer-links a { Color: #71717a; text-decoration: none; font-size: 11px; margin: 0 12px; transition: color 0.2s; }
        .footer-links a:hover { color: #a1a1aa; }
        .divider { height: 1px; background-color: #27272a; margin: 30px auto; width: 40px; }

        /* Mobile */
        @media only screen and (max-width: 600px) {
            .header { padding: 40px 24px; }
            .content { padding: 40px 24px; }
            .details-cell { padding: 18px 20px; }
            .label { font-size: 11px; }
            .value { font-size: 13px; }
            h2 { font-size: 22px; }
            p { font-size: 15px; }
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <table class="main-table" align="center">
            <!-- Header -->
            <tr>
                <td class="header">
                    <h1 style="margin: 0;">VORTX ESPORTS</h1>
                    <div class="subtitle">Official Tournament Registration</div>
                </td>
            </tr>

            <!-- Content -->
            <tr>
                <td class="content">
                    <div class="status-container">
                        <span class="status-badge ${status === 'verified' ? 'status-verified' : 'status-pending'}">
                            ${status === 'verified' ? 'Payment Verified' : 'Under Review'}
                        </span>
                    </div>

                    <h2>Transaction Confirmation</h2>
                    
                    <p>
                        ${status === 'verified'
            ? `Hello ${userName}, your payment has been successfully processed. You are now officially registered for the tournament.`
            : `Hello ${userName}, we have received your payment proof. Our team is currently reviewing the transaction details.`}
                    </p>

                    <!-- Details Table -->
                    <div class="details-wrapper">
                        <table class="details-table">
                            <tr class="details-row">
                                <td class="details-cell label">Reference ID</td>
                                <td class="details-cell value" style="font-family: 'Courier New', Courier, monospace;">${transactionId}</td>
                            </tr>
                            <tr class="details-row">
                                <td class="details-cell label">Participant</td>
                                <td class="details-cell value">${gamingName}</td>
                            </tr>
                            <tr class="details-row">
                                <td class="details-cell label">Location</td>
                                <td class="details-cell value">${city}</td>
                            </tr>
                            <tr class="details-row">
                                <td class="details-cell label">Tournament</td>
                                <td class="details-cell value">${tournamentName}</td>
                            </tr>
                            <tr class="details-row">
                                <td class="details-cell label">Date</td>
                                <td class="details-cell value">${paymentDate}</td>
                            </tr>
                        </table>
                    </div>

                    ${status === 'verified' ? `
                    <div class="btn-container">
                        <a href="#" class="btn">View Tournament Details</a>
                    </div>
                    ` : ''}

                    <div style="margin-top: 48px; padding-top: 32px; border-top: 1px solid #27272a; text-align: center;">
                        <p style="font-size: 13px; color: #71717a; margin: 0;">If you have any questions, please reply directly to this email.</p>
                    </div>
                </td>
            </tr>

                    ${status === 'verified' ? `
                    <div class="btn-container">
                        <a href="#" class="btn">View Tournament Details</a>
                    </div>
                    ` : ''}

                    <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #27272a; text-align: center;">
                        <p style="font-size: 13px; color: #71717a; margin: 0;">If you have any questions, please reply directly to this email.</p>
                    </div>
                </td>
            </tr>

            <!-- Footer -->
            <tr>
                <td class="footer">
                    <p class="footer-text">© ${new Date().getFullYear()} Vortx Esports. All rights reserved.</p>
                    <p class="footer-text">This email was sent to ${userEmail}</p>
                    
                    <div class="footer-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Support</a>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>
    `;

    const textVersion = `
VORTX ESPORTS - Official Tournament Registration

Hello ${userName},

${status === 'verified'
            ? 'Your payment has been successfully processed. You are now officially registered for the tournament.'
            : 'We have received your payment proof. Our team is currently reviewing the transaction details.'}

TRANSACTION DETAILS
-------------------
Reference ID: ${transactionId}
Participant: ${gamingName}
Location: ${city}
Tournament: ${tournamentName}
Date: ${paymentDate}
Status: ${status === 'verified' ? 'Verified' : 'Under Review'}

If you need assistance, please contact support@vortxesports.com

© ${new Date().getFullYear()} Vortx Esports. All rights reserved.
    `;

    try {
        const info = await transporter.sendMail({
            from: '"Vortx Esports Support" <sledgevortx@gmail.com>',
            to: userEmail,
            subject: `${status === 'verified' ? 'Confirmation' : 'Update'}: ${tournamentName} Registration`,
            text: textVersion,
            html: htmlTemplate,
        });

        console.log("Payment verification email sent:", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending payment verification email:", error);
        return { success: false, error: error.message };
    }
};

// Export the function
