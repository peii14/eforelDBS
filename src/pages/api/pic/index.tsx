import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });

  if (!token) {
    return res.status(401).end();
  }
  const query = req.query.q;
  if (req.method === "GET") {
    const pic = await prisma.pIC.findMany({
      where: {
        pic_name: {
          contains: query.toString(),
        },
      },
    });
    return res.send(pic);
  } else if (req.method === "POST") {
    const { body: data } = req;
    const newPIC = await prisma.pIC.create({ data });

    return res.status(201).send(newPIC);
  }
}
