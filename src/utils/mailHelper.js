import config from '../config/index.js';
import transporter from '../config/transporter.config.js';

const mailHelper = async (option) => {
    console.log(option)
    const message = {
        from: config.SMTP_SENDER_EMAIL ,
        to: option.email ,
        subject: option.subject,
        text: option.text
    }

    await transporter.sendMail(message)
}

export default mailHelper


// import mailHelper from "../utils/mailHelper.js";
// import asyncHandler from './../services/asyncHandler.js';

// export const sendMail = asyncHandler(async (req,res) => {
//     const option = {
//         email: "some@gmail.com",
//         subject: "some message",
//         text: "some text"
//     }
//     console.log(option.to)
//     await mailHelper(option)

//     res.status(200).json({
//         success: true,
//         message: "Mail sent successfully"
//     })
// })