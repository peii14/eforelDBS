import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
  const query = req.query.q;

    if (req.method === "POST") {
        const { body: data } = req;
        const mop = await prisma.mOP.create({ data });
        return res.status(201).send(mop);
    }else if(req.method === "GET"){
        const mop = await prisma.mOP.findMany({where:{mop_num:{contains:`-${query}-`}},select:{mop_num:true}})
        return res.status(200).send(mop)
    }
}