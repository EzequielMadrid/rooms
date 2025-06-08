import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  // Check if userId is provided
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  // If no response object is provided, return the token
  // Set the token as a cookie in the response
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS 7 days
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development", // use secure cookies in production
  });

  return token;
};
