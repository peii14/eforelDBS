import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const type = req.query.param;
  const query = req.query.q;
  if (req.method === "GET") {
    if (type === "nameOnly") {
      const quotation = await prisma.quotation.findMany({
        where: {
          Q_num: { contains: query.toString() },
        },
      });
      return res.send(quotation);
    } else {
      const quotation = await prisma.quotation.findMany();
      return res.send(quotation);
    }
  } else if (req.method === "POST") {
    const { body: data } = req;
    const quotation = await prisma.quotation.create({ data });
    return res.status(201).send(quotation);
  }
}
