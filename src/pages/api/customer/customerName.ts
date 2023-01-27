import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from 'next-auth/jwt';

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const token = await getToken({ req })

    if(token=== null ||!token){
        return res.status(401).end()
    }
    const query = req.query.q
    
    if(req.method === "GET"){
        const isExist =await prisma.customer.findMany({where:{
            customer_name:{
                startsWith: query.toString()
            }
        },select:{
            customer_name: true
        }})
        res.status(200).send(isExist)
    }
}