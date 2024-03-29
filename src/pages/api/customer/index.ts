import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
){
    const token = await getToken({ req })

    if(token=== null ||!token){
        return res.status(401).end()
    }
    const query = req.query.q

    if(req.method === "GET"){
        const customer = await prisma.customer.findMany({
            where:{
                customer_name:{
                    contains: query.toString()
                },
                customer_salesCode: req.query.salesCode.toString()
            },
            include:{
                VerticalMarket:{
                    include:{
                        Group:{
                            select:{
                                group_name:true
                            }
                        }
                    }
                }
            }
        });
        return res.status(200).send(customer)
    }
    else if(req.method === "POST"){
        const {body: data} = req;
        const newCustomer = await prisma.customer.create({data});
        return res.status(201).send(newCustomer)
    }
    return res.status(201).end()

}