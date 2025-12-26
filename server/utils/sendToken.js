export const sendToken = (user, statusCode, message, res) => {
    const token = user.generateToken();
  
    const cookieExpireDays = Number(process.env.COOKIE_EXPIRE || 7);
  
    res
      .status(statusCode)
      .cookie("token", token, {
        expires: new Date(
          Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // ✅ HTTPS only in prod
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      })
      .json({
        success: true,
        message,
        token,
        user,
      });
  };
  