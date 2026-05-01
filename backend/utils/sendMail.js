const axios = require("axios");
require("dotenv").config();

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SENDER_EMAIL = process.env.EMAIL_USER;
const SENDER_NAME = "IterNation";

const sendEmail = async (email, subject, text, htmlContent = null) => {
  try {
    if (!BREVO_API_KEY) {
      console.warn("sendEmail: BREVO_API_KEY not configured, skipping send to", email);
      return;
    }
    if (!SENDER_EMAIL) {
      console.warn("sendEmail: SENDER_EMAIL not configured, skipping send to", email);
      return;
    }

    const payload = {
      sender: {
        name: SENDER_NAME,
        email: SENDER_EMAIL,
      },
      to: [
        {
          email: email,
        },
      ],
      subject: subject,
    };

    // Use HTML if provided, otherwise use plain text
    if (htmlContent) {
      payload.htmlContent = htmlContent;
    } else {
      payload.textContent = text;
    }

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      payload,
      {
        headers: {
          accept: "application/json",
          "api-key": BREVO_API_KEY,
          "content-type": "application/json",
        },
      }
    );

    console.log("Email sent successfully via Brevo HTTP API!");
    return response.data;
  } catch (err) {
    console.error(
      "Brevo API error:",
      err.response ? err.response.data : err.message
    );
    throw err;
  }
};

module.exports = sendEmail;