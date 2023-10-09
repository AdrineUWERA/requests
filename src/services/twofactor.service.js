import { redisClient, sendTheEmail } from "../helpers";
import { OtpUtils, tokenUtils } from "../utils";

async function twoFactorAuth(res, user) {
  const body = {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
  };
  const token = tokenUtils.generateToken(body);
  const otp = OtpUtils.generateOtp();
 
  redisClient.setEx(user.email, 900, `${otp}=${token}`).then(async () => {
    const mailOptions = {
      to: user.email,
      subject: "verification code",
      html: `Your verification code is: ${otp}`,
    };
    await sendTheEmail(mailOptions);
  });

  return res.status(200).json({
    code: 200,
    message: "Code has been sent to your email",
  });
}

export default twoFactorAuth;
