import * as argon2 from "argon2";
import User from "@/models/User";
import db from "@/utils/db";
import VerificationMail from "@/utils/mailer";
import html from "@/utils/emailVerif";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const { name, email, password } = req.body;
  if (
    !name ||
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 5
  ) {
    res.status(422).json({
      message: "Validation error",
    });
    return;
  }

  await db.connect();

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: "User exists already!" });
    await db.disconnect();
    return;
  }

  const newUser = new User({
    name,
    email,
    password: await argon2.hash(password),
    emailToken: await argon2.hash(email),
  });
  const user = await newUser.save();

  await db.disconnect();

  const verifyToken = await argon2.hash(user.emailToken);
  const url: string = `http://localhost:3000/User/verify/${verifyToken}`;
  const verifMail = VerificationMail({
    destination: email,
    subject: "Email Verification",
    text: "Email Verification",
    html: html({ url }),
  });

  res.status(201).send({
    message: "Created user!",
    _id: user._id,
    name: user.name,
    email: user.email,
    verifMail: verifMail,
  });
}

export default handler;
