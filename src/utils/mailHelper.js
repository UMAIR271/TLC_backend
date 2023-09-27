import config from "../config/index.js";
import transporter from "../config/transporter.config.js";

const mailHelper = async (option) => {
  try {
    const message = {
      from: config.SMTP_SENDER_EMAIL,
      to: option.email,
      subject: option.subject,
      text: option.text,
      html: option.html,
    };
    const res = await transporter.sendMail(message);
    return res;
  } catch (err) {
    return err;
  }
};

export default mailHelper;
