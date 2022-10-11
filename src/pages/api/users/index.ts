import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
){
    const prisma = new PrismaClient();
    if(req.method === "GET")
    {
        const users = await prisma.user.findMany();
        return res.send(users)
    }
    else if(req.method === "POST")
    {
        const {body: data} = req;
        console.log(data);
        const newUser = await prisma.user.create({data});
        return res.status(201).send(newUser)
    }
}
