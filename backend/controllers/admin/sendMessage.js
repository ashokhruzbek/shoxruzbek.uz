const nodemailer = require('nodemailer');
const pool = require('../../config/db');
require('dotenv').config();

// Email transporter setup
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        message: "Barcha maydonlar to'ldirilishi shart" 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: "Email manzil noto'g'ri formatda" 
      });
    }

    // Save to database
    const result = await pool.query(
      `INSERT INTO contact_messages (name, email, subject, message, created_at)
       VALUES ($1, $2, $3, $4, NOW())
       RETURNING *`,
      [name, email, subject, message]
    );

    // Send email notification to admin
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Yangi Portfolio Xabari
          </h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Ism:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mavzu:</strong> ${subject}</p>
          </div>
          <div style="background: white; padding: 20px; border-left: 4px solid #007bff; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Xabar:</h3>
            <p style="line-height: 1.6;">${message}</p>
          </div>
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px;">
              Bu xabar avtomatik ravishda yuborildi - Portfolio website
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    // Send auto-reply to user
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Xabaringiz qabul qilindi - Portfolio',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #007bff;">Rahmat, ${name}!</h2>
          <p>Sizning xabaringiz muvaffaqiyatli qabul qilindi.</p>
          <p>Tez orada sizga javob beramiz.</p>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Yuborilgan xabar:</strong></p>
            <p><em>"${message}"</em></p>
          </div>
          <p style="color: #666;">Hurmat bilan,<br>Portfolio Team</p>
        </div>
      `
    };

    await transporter.sendMail(autoReplyOptions);

    res.status(201).json({
      message: "Xabar muvaffaqiyatli yuborildi!",
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Contact message error:', error);
    res.status(500).json({ 
      message: "Xabar yuborishda xatolik yuz berdi" 
    });
  }
};

exports.getContactMessages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const result = await pool.query(
      `SELECT * FROM contact_messages 
       ORDER BY created_at DESC 
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const countResult = await pool.query(
      'SELECT COUNT(*) FROM contact_messages'
    );

    res.json({
      messages: result.rows,
      totalMessages: parseInt(countResult.rows[0].count),
      currentPage: page,
      totalPages: Math.ceil(countResult.rows[0].count / limit)
    });

  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ 
      message: "Xabarlarni olishda xatolik" 
    });
  }
};
