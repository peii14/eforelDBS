import * as argon2 from "argon2";
// import VerificationMail from "@/utils/mailer";
// import html from "@/utils/emailVerif";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma-db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // if (req.method !== "POST") {
  //   return;
  // }
  // const { name, email, password } = req.body;
  // if (
  //   !name ||
  //   !email ||
  //   !email.includes("@") ||
  //   !password ||
  //   password.trim().length < 5
  // ) {
  //   res.status(422).json({
  //     message: "Validation error",
  //   });
  //   return;
  // }

  // const existingUser = await prisma.user.findUnique({
  //   where: {
  //     userEmail: email,
  //   },
  // });
  // if (existingUser) {
  //   res.status(422).json({ message: "User exists already!" });

  //   return;
  // }
  // const user: User = {};

  const newUser = await prisma.user.create({
    data: {
      user_email: "admin@gmail.com",
      user_fullname: "admin",
      user_isAdmin: true,
      user_password: await argon2.hash("123123123"),
      user_area: 1,
      user_code: "BD",
      user_salesActivity: 1,
    },
  });

  res.status(201).send({
    message: "Created user!",
  });
}

export default handler;
