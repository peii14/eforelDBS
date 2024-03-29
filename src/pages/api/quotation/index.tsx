import { startOfMonth, endOfMonth } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token: any = await getToken({ req });
  const type = req.query.type;
  const query = req.query.q;

  if (req.method === "GET") {
    if (type === "nameOnly") {
      const quotation: any = await prisma.quotation.findMany({
        where: {
          quotation_num: {
            startsWith: query.toString(),
            contains: token.user_code,
          },
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
          AND: [
            {
              quotation_createdAt: {
                gte: startOfMonth(new Date()),
                lte: endOfMonth(new Date()),
              },
            },
          ],
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
