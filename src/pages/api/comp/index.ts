import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
){
    const prisma = new PrismaClient();
    if(req.method === "GET")
    {
        const compro = await prisma.compro.findMany({
            where: {
                USER_U_ID: 2
            },
            include: {
                user: true
            }
        });
        return res.send(compro)
    }
    else if(req.method === "POST")
    {
        const {body: data} = req;
        console.log(data);
        const newComp = await prisma.compro.create({data});
        return res.status(201).send(newComp)
    }
}