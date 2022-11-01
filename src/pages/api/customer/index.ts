import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
){
    const prisma = new PrismaClient();
    const query = req.query.param
    if(req.method === "GET"){
        if(query === 'nameOnly'){
            const customer = await prisma.customer.findMany({
                select:{
                    cust_name:true, 
                }
            });
            return res.send(customer)
        }else{
            const customer = await prisma.customer.findMany();
            return res.send(customer)
        }
    }
    else if(req.method === "POST")
    {
        const {body: data} = req;
        const newCustomer = await prisma.customer.create({data});
        return res.status(201).send(newCustomer)
    }

}