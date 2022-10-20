import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
){
    const prisma = new PrismaClient();

    if(req.method === "GET")
    {
        const customer = await prisma.customer.findMany();
        return res.send(customer)
    }
    else if(req.method === "POST")
    {
        const {body: data} = req;
        console.log(data);
        const newCustomer = await prisma.customer.create({data});
        return res.status(201).send(newCustomer)
    }
}