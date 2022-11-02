import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
){


    if(req.method === "GET")
    {
        const salesActivity = await prisma.salesActivity.findMany();
        return res.send(salesActivity)
    }
    else if(req.method === "POST")
    {
        const {body: data} = req;
        console.log(data);
        const newSalesActivity = await prisma.salesActivity.create({data});
        return res.status(201).send(newSalesActivity)
    }
}