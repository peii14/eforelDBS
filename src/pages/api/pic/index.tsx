import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
    console.log(data);
    const newPIC = await prisma.pIC.create({ data });
    return res.status(201).send(newPIC);
  }
}
