import speakeasy from "speakeasy";

function generateOtp() {
  const { base32: secret } = speakeasy.generateSecret({ length: 20 });
  const otp = speakeasy.totp({
    secret,
    encoding: "base32",
    time: Math.floor(Date.now() / 1000 / 90),
    step: 900,
  });
  return otp;
}
export default {generateOtp};
