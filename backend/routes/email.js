const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

router.post("/send-confirmation-email", async (req, res) => {
  const { shippingInfo, items } = req.body;

  if (!shippingInfo || !items || !items.length) {
    return res.status(400).json({ success: false, message: "Missing data." });
  }

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const itemsHtml = items.map(
    item => `<li>${item.quantity} x ${item.name} - $${item.price}</li>`
  ).join("");

  const mailOptions = {
    from: '"Ecart" <no-reply@ecart.com>',
    to: shippingInfo.email,
    subject: "Order Confirmation - Ecart",
    html: `
      <h2>Thank you for your order!</h2>
      <h3>Shipping Info:</h3>
      <p>Name: ${shippingInfo.fullName}</p>
      <p>Phone: ${shippingInfo.phone}</p>
      <p>Address: ${shippingInfo.address}, ${shippingInfo.city} - ${shippingInfo.zip}</p>

      <h3>Order Summary:</h3>
      <ul>${itemsHtml}</ul>
      <p><strong>Total: $${total}</strong></p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent." });
  } catch (err) {
    console.error(" Mail error:", err);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

module.exports = router;
