import { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
){
    if(req.method === "GET")
    {
        const companyProfile = await prisma.companyProfile.findMany({
            where: {
                company_id: 1
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
        const newComp = await prisma.companyProfile.create({data});
        return res.status(201).send(newComp)
    }
}