import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   if (req.method != "GET") return res.status(500);
  const query = req.query.q;

  const data = await prisma.customer.findUnique({
    where: {
      cust_id: Number(query),
    },
  });
  return res.send(data);
}
