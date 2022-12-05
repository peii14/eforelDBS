import { NextApiRequest, NextApiResponse } from 'next'
import {getCurrentDate} from "@/utils/getDate"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
){
    if(req.method === "GET"){
        const salesActivity = await prisma.salesActivity.findMany({
            include:{
                customer:{
                    select:{
                        customer_name: true
                    }
                }
            }
        });
        return res.send(salesActivity)
    }
    else if(req.method === "POST"){
        const newSalesActivity = await prisma.salesActivity.create({
            data:{
                salesActivity_date: getCurrentDate(),
                salesActivity_followup: 'default',
                salesActivity_jobDesc: 'default',
                salesActivity_customerID:1
                
            }
        });
        return res.status(201).send(newSalesActivity)
    }
    else if(req.method === "DELETE"){
        const deleteUser = await prisma.salesActivity.delete({
            where:{
                salesActivity_id: Number(req.query.q),
            }
        })
        return res.status(200).send(deleteUser)
    }else if(req.method === "PUT"){
        const {jobDescription , customer_id, selectedFollowup,date,newActivityID} = req.body
        await prisma.salesActivity.update({
            where:{
                salesActivity_id: Number(newActivityID)
            },
            data:{
                salesActivity_date: date,
                salesActivity_followup: selectedFollowup,
                salesActivity_customerID: customer_id,
                salesActivity_jobDesc: jobDescription
            }
        })
        res.status(200).send("OK")
    }
}