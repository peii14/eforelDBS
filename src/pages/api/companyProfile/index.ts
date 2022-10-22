import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
){
    const prisma = new PrismaClient();
    if(req.method === "GET")
    {
        const companyProfile = await prisma.companyProfile.findMany({
            where: {
                COMP_ID: 1
            },
            include: {
                user: true
            }
        });
        return res.send(companyProfile)
    }
    else if(req.method === "POST")
    {
        const {body: data} = req;
        console.log(data);
        const newComp = await prisma.companyProfile.create({data});
        return res.status(201).send(newComp)
    }
}