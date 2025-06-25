import nodemailer from 'nodemailer';
import User from '@/models/userModule';
import bcrypt from 'bcryptjs';
import { EmailType, SUPPORT_EMAIL } from '@/constants'

interface SendEmailParams {
    email: string;
    emailType: EmailType;
    userId: string;
  }
export const sendEmail= async({email , emailType, userId}: SendEmailParams)=>{
 try {
    const hashedToken = await bcrypt.hash( userId.toString(), 10);
    
    if(emailType === EmailType.VERIFY){
        await User.findByIdAndUpdate(userId,{
            verifyToken : hashedToken,
            verifyTokenExpiry : Date.now() + 3600000
        })
    }else if(emailType === EmailType.FORGOT_PASSWORD){
        await User.findByIdAndUpdate({
            forgotPasswordToken : hashedToken,
            forgotPasswordTokenExpiry : Date.now() + 3600000
        })
    }
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS
        }
      });
      const mailOptions = {
        from: SUPPORT_EMAIL,
        to: email,
        subject: 'Verify your email',
        html: `
          <h2>Email Verification</h2>
          <p>Hello,</p>
          <p>Please click the link below to verify your email address:</p>
          <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">
            Verify Email
          </a>
          <p>Or copy and paste the url in the browser </br>
          ${process.env.DOMAIN}/verifyEmail?token=${hashedToken}</p>
          <p>This link will expire in 1 hour.</p>
        `,
      };

      const mailResponse = await transport.sendMail(mailOptions);
      return mailResponse;
 } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error occurred While Getting mail : ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred While Getting mail");
    }
  }
}

