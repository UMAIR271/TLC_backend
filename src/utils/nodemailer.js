import nodemailer from "nodemailer";
const sendEmail = async (option) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "malikumair2701@gmail.com",
        pass: "bjwd pmao swon vlxv",
      },
    });
    const mailOptions = {
      from: "malikumair2701@gmail.com",
      to: option.email,
      subject: option.subject,
      text: option.text,
      html: option.html,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        console.log("Email sent:", info.response);
      }
    });
  } catch (err) {
    return err;
  }
};

export default sendEmail;
