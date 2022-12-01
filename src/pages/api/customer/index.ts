import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
){
    const query = req.query.q
    if(req.method === "GET"){
            const customer = await prisma.customer.findMany({
                where:{
                customer_name:{
                     contains: query.toString()
                }
                }
            });
            return res.send(customer)
     
    }
    else if(req.method === "POST")
    {
        const {body: data} = req;
        const newCustomer = await prisma.customer.create({data});
        return res.status(201).send(newCustomer)
    }

}