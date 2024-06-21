import { User } from "../models/userSchema.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { generateToken } from "../utils/jwtToken.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.create({
    email,
    password,
  });

  res.status(200).json({
    success: true,
    message: "User Registered",
  });

  generateToken(user, "user registered", 200, res);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("email or password is required!!"));
  }
  const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("invalid email or password"));
    }
    generateToken(user, "Logged in", 200, res);
});
