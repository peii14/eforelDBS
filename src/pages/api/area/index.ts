import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
){
    const prisma = new PrismaClient();
    if(req.method === "GET")
    {
        const Area = await prisma.area.findMany({
            where:{
                area: 62
            },
            include: {
                user: true
            }
        });
        return res.send(Area)
    }
    else if(req.method === "POST")
    {
        const {body: data} = req;
        console.log(data);
        const newComp = await prisma.area.create({data});
        return res.status(201).send(newComp)
    }
}