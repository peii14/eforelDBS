import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
){
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
        const newComp = await prisma.area.create({data});
        return res.status(201).send(newComp)
    }
}