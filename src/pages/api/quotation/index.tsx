import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const type = req.query.type;
  const query = req.query.q;

  if (req.method === "GET") {
    if (type === "nameOnly") {
      const quotation: any = await prisma.quotation.findMany({
        where: {
          quotation_num: { contains: query.toString() },
        },
        include: {
          customer: {
            include: {
              VerticalMarket: {
                select: {
                  verticalMarket_name: true,
                },
              },
              PIC: {
                select: {
                  pic_name: true,
                  pic_position: true,
                  pic_email: true,
                  pic_phone: true,
                },
              },
            },
          },
        },
      });
      return res.send(quotation);
    } else if (type === "totalQuotation") {
      const totalQuotation = await prisma.quotation.findMany({
        where: {
          quotation_num: {
            contains: `-${query}-`,
          },
        },
        select: { quotation_num: true },
      });
      return res.send(totalQuotation);
    } else {
      const quotation = await prisma.quotation.findMany();
      return res.send(quotation);
    }
  } else if (req.method === "POST") {
    const { body: data } = req;
    const quotation = await prisma.quotation.create({ data });
    return res.status(201).send(quotation);
  }
  res.status(201).end();
}
