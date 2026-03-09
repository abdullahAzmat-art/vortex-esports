import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config({ path: './Backend/.env' });

const resend = new Resend(process.env.RESEND_API_KEY);

async function testResend() {
    try {
        console.log("Using API Key:", process.env.RESEND_API_KEY?.substring(0, 7) + "...");
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'abdullah.azmat.art@gmail.com', // Using a placeholder, user can check their Resend dashboard
            subject: 'Resend API Test',
            html: '<p>Resend API is working <strong>successfully</strong>!</p>'
        });

        if (error) {
            console.error("Test failed:", error);
        } else {
            console.log("Test success! Email ID:", data.id);
        }
    } catch (err) {
        console.error("Critical error:", err);
    }
}

testResend();
