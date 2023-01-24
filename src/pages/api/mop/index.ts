import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if (req.method === "POST") {
        const { body: data } = req;
        const mop = await prisma.mOP.create({ data });
        return res.status(201).send(mop);
      }
}