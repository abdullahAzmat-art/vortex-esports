import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
        user: "sledgevortx@gmail.com",
        pass: "agvw drsx zkxo lkme",
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
    const tournamentName = registration.tournamentId?.name || 'Tournament';
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
        
        /* Details Table */
        .details-wrapper { background-color: #27272a40; border-radius: 6px; overflow: hidden; border: 1px solid #3f3f46; margin-top: 32px; }
        .details-row { padding: 16px 20px; border-bottom: 1px solid #3f3f46; display: flex; justify-content: space-between; align-items: center; }
        .details-row:last-child { border-bottom: none; }
        .label { color: #71717a; font-weight: 500; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
        .value { color: #f4f4f5; font-weight: 600; text-align: right; font-size: 14px; }
        
        /* Buttons */
        .btn-container { text-align: center; margin-top: 40px; }
        .btn { display: inline-block; background: #6d28d9; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-weight: 500; transition: all 0.2s; font-size: 14px; letter-spacing: 0.5px; box-shadow: 0 4px 6px -1px rgba(109, 40, 217, 0.3); }
        .btn:hover { background: #5b21b6; transform: translateY(-1px); box-shadow: 0 6px 8px -1px rgba(109, 40, 217, 0.4); }
        
        /* Footer */
        .footer { padding: 32px 20px; text-align: center; background-color: #09090b; }
        .footer-text { margin: 0 0 8px; color: #52525b; font-size: 12px; }
        .footer-links { margin: 16px 0 0; }
        .footer-links a { Color: #71717a; text-decoration: none; font-size: 11px; margin: 0 8px; transition: color 0.2s; }
        .footer-links a:hover { color: #a1a1aa; }
        .divider { height: 1px; background-color: #27272a; margin: 24px auto; width: 40px; }

        /* Mobile */
        @media only screen and (max-width: 600px) {
            .header { padding: 32px 20px; }
            .content { padding: 32px 20px; }
            .details-row { padding: 14px 16px; }
            .value { font-size: 13px; }
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <table class="main-table" align="center">
            <!-- Header -->
            <tr>
                <td class="header">
                    <h1>VORTX ESPORTS</h1>
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

                    <!-- Details Section -->
                    <div class="details-wrapper">
                        <div class="details-row">
                            <span class="label">Reference ID</span>
                            <span class="value" style="font-family: monospace; letter-spacing: 0.5px;">${transactionId}</span>
                        </div>
                        <div class="details-row">
                            <span class="label">Participant</span>
                            <span class="value">${gamingName}</span>
                        </div>
                        <div class="details-row">
                            <span class="label">Location</span>
                            <span class="value">${city}</span>
                        </div>
                        <div class="details-row">
                            <span class="label">Tournament</span>
                            <span class="value">${tournamentName}</span>
                        </div>
                        <div class="details-row">
                            <span class="label">Date</span>
                            <span class="value">${paymentDate}</span>
                        </div>
                    </div>

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
