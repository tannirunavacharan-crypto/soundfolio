const nodemailer = require('nodemailer');

const sendInquiryEmail = async (inquiryData) => {
  const { name, email, phone, projectType, budget, timeline, description } = inquiryData;

  const adminEmail = process.env.ADMIN_EMAIL || 'composer.akbhuker@example.com';
  const senderEmail = process.env.SENDER_EMAIL || 'inquiries@soundfolio.com';

  const emailBody = `
    <h2>New Project Inquiry - SoundFolio</h2>
    <p>You have received a new inquiry from your portfolio website.</p>
    
    <table border="1" cellpadding="8" style="border-collapse: collapse; border-color: #ddd; width: 100%; max-width: 600px;">
      <tr style="background-color: #f2f2f2;">
        <th align="left">Field</th>
        <th align="left">Details</th>
      </tr>
      <tr>
        <td><strong>Name</strong></td>
        <td>${name}</td>
      </tr>
      <tr>
        <td><strong>Email</strong></td>
        <td><a href="mailto:${email}">${email}</a></td>
      </tr>
      <tr>
        <td><strong>Phone</strong></td>
        <td>${phone || 'Not provided'}</td>
      </tr>
      <tr>
        <td><strong>Project Type</strong></td>
        <td>${projectType}</td>
      </tr>
      <tr>
        <td><strong>Budget Range</strong></td>
        <td>${budget || 'Not provided'}</td>
      </tr>
      <tr>
        <td><strong>Timeline</strong></td>
        <td>${timeline || 'Not provided'}</td>
      </tr>
      <tr>
        <td><strong>Description</strong></td>
        <td>${description.replace(/\n/g, '<br/>')}</td>
      </tr>
    </table>
    
    <br/>
    <p>This inquiry has also been stored in your SoundFolio database and is visible on your Admin Dashboard.</p>
  `;

  // Verify if SMTP environment parameters are defined
  const isSmtpConfigured =
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS;

  if (isSmtpConfigured) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: parseInt(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const info = await transporter.sendMail({
        from: `"SoundFolio Inquiries" <${senderEmail}>`,
        to: adminEmail,
        subject: `New SoundFolio Inquiry from ${name} - ${projectType}`,
        html: emailBody,
      });

      console.log(`Email successfully sent: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Nodemailer Error: Failed to send inquiry email.', error);
      // We don't crash, just log and return false status
      return { success: false, error: error.message };
    }
  } else {
    // Development fallback
    console.log('\n==================================================');
    console.log('📬 DEV MAIL NOTIFICATION (SMTP not configured):');
    console.log(`TO: ${adminEmail}`);
    console.log(`FROM: ${senderEmail}`);
    console.log(`SUBJECT: New SoundFolio Inquiry from ${name} - ${projectType}`);
    console.log('CONTENT:');
    console.log(`  Name: ${name}`);
    console.log(`  Email: ${email}`);
    console.log(`  Phone: ${phone}`);
    console.log(`  Project: ${projectType}`);
    console.log(`  Budget: ${budget}`);
    console.log(`  Timeline: ${timeline}`);
    console.log(`  Description: ${description}`);
    console.log('==================================================\n');
    return { success: true, mode: 'development-log' };
  }
};

module.exports = { sendInquiryEmail };
