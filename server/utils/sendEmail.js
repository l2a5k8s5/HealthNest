import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            service: process.env.SMTP_SERVICE,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            }
        });

        const options = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject,
            html: message,
        };

        await transporter.sendMail(options); // Changed from sendEmail to sendMail
        
        console.log(`Email sent successfully to ${email}`);
        return { success: true };
    } catch (error) {
        console.log("Error sending email:", error);
        throw error; // Re-throw so calling code knows it failed
    }
};