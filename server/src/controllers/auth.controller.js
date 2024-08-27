const asyncHandler = require("express-async-handler");
const Users = require("../model/users.model");
const token = require("../utils/token.utils");
const resetMailer = require("../utils/email.utils");
const bcrypt = require("bcrypt");
const path = require("path");
const Token = require("../model/token.model");
const resetTokens = require("../utils/passwordResetToken");

/**
 * @Desc    Register user
 * @Route   POST /api/auth/register
 * @Access  Public
 */
const register = asyncHandler(async function (req, res) {
  const { email, uniqueNumber, password, confirmPassword } = req.body;

  if (!email || !uniqueNumber || !password || !confirmPassword) {
    res.status(400);
    throw new Error("fill all fields!");
  }

  const userExist = await Users.findOne({ email });

  if (userExist) {
    res.status(403);
    throw new Error("Users already registered");
  }

  const passwordsMatched = password === confirmPassword;

  if (!passwordsMatched) {
    res.status(400);
    throw new Error("Password do not match!");
  }

  if (passwordsMatched) {
    const passwordSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, passwordSalt);

    await Users.create({
      email,
      uniqueNumber,
      password: hashedPassword,
    });

    res.sendStatus(204);
  }
});

/**
 * @Desc    Login user
 * @Route   POST /api/auth/login
 * @Access  Public
 */
const login = asyncHandler(async function (req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("fill all field");
  }

  const existUser = await Users.findOne({ email });

  if (!existUser) {
    res.status(401);
    throw new Error("incorrect email or password");
  }

  const hashedPassword = existUser.password;

  const decryptPassword = await bcrypt.compare(password, hashedPassword);

  if (!decryptPassword) {
    res.status(401);
    throw new Error("incorrect email or password");
  }

  const refreshToken = token.createRefreshToken({ id: existUser._id, email });

  const accessToken = token.createAccessToken({ id: existUser._id, email });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: true, //process.env.NODE_ENV === "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json({
    status: 200,
    msg: "access granted",
    id: existUser._id,
    email: existUser.email,
    accessToken: accessToken,
  });
});

/**
 * @Desc    Logout user
 * @Route   POST /api/auth/logout
 * @Access  Public
 */
const logout = asyncHandler(function (req, res) {
  const cookies = req?.cookies;

  console.log(cookies);

  if (!cookies) return res.sendStatus(204);

  res.clearCookie("refresh_token", {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });

  return res.status(200).json({
    message: "refresh cookie cleared",
  });
});

/**
 * @Desc    Refresh token
 * @Route   POST /api/auth/refresh
 * @Access  Public
 */
const refresh = asyncHandler(async function (req, res) {
  const cookies = req.cookies;

  if (!cookies) return res.status(403).json({ msg: "forbidden" });

  const refreshToken = req?.cookies?.refresh_token;

  if (refreshToken) {
    const decodedCookie = token.verifyRefreshToken(refreshToken);

    const checkUser = await Users.findOne({ email: decodedCookie.email });

    if (!checkUser) return res.status(401).json({ msg: "Unauthorised" });

    const accessToken = token.createAccessToken({
      id: decodedCookie.id,
      email: decodedCookie.email,
    });

    res.status(200).json({
      status: "Ok",
      accessToken,
      id: decodedCookie.id,
      email: decodedCookie.email,
    });
  } else {
    res.status(401).json({
      msg: "not authorised",
    });
  }
});

/**
 * @Desc    Request reset token
 * @Route   POST /api/auth/reset
 * @Access  Public
 */
const reset = asyncHandler(async (req, res) => {
  const { email } = req.body;

  console.log(email);

  if (!email) {
    res.status(400);
    throw new Error("fill in field");
  }

  const user = await Users.findOne({ email });

  if (user) {
    const resetToken = await resetTokens.passwordResetToken(user._id);

    const link = `http://localhost:5173/password-change/?token=${resetToken}&id=${user._id}`;

    const payload = {
      userEmail: email,
      subject: "Password reset request",
      templateUrl: path.join(
        __dirname,
        "..",
        "templates",
        "passwordResetTemplate.hbs"
      ),
      resetLink: link,
      userName: "Amin",
      logoUrl: "",
    };

    resetMailer(payload);

    res.sendStatus(204);
  } else {
    res.status(404).json({
      msg: "user not found",
    });
  }
});

/**
 * @Desc    New password
 * @Route   POST /api/auth/new-password
 * @Access  Public
 */
const newPassword = asyncHandler(async function (req, res) {
  const { token, id } = req.query;

  const { newPassword, confirmNewPassword } = req.body;

  if (!newPassword || !confirmNewPassword) {
    res.status(400);
    throw new Error("fill all fields");
  }

  let isValid;

  if (token && id) {
    isValid = await resetTokens.verifyPasswordToken({ token, id });
  }

  console.log(isValid);

  if (isValid === "token expired") {
    res.status(403);
    throw new Error("reset token expired");
  }

  if (newPassword !== confirmNewPassword) {
    res.status(400);
    throw new Error("password do not match");
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(newPassword, salt);

  const updatedUser = await Users.findByIdAndUpdate(id, {
    password: hashedPassword,
  });

  if (!updatedUser) {
    res.status(400);
    throw new Error("could not change password");
  } else {
    res.sendStatus(204);
  }
});

const checkToken = asyncHandler(async function (req, res) {
  const { token } = req.body;

  console.log(token);
  try {
    const existToken = await Token.findOne({ token });

    if (existToken.activated === true) {
      res.sendStatus(423);
    }

    if (existToken) {
      return res.sendStatus(200);
    }

    res.sendStatus(404);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const acceptTerms = asyncHandler(async function (req, res) {
  const { id } = req.params;

  const checkUser = await Users.findById(id);

  console.log("ZZZ>>>>", checkUser);

  res.json(checkUser);
});

module.exports = {
  register,
  login,
  logout,
  refresh,
  reset,
  newPassword,
  checkToken,
  acceptTerms,
};
