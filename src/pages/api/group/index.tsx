import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const fetch = await prisma.group.findUnique({
      where: {
        group_id: Number(req.query.id),
      },
    });
    return res.status(200).send(fetch);
  }
};

export default handler;
