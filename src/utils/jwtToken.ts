export const sentToken = (
  user: any,
  statusCode: any,
  res: any,
  message: any
) => {
  const token = user.getJWTToken();
  // console.log(token);
  
  const option = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, option).json({
    success: true,
    user,
    message,
    token,
  });
};
