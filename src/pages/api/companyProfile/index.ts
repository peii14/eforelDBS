import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
){
    const token = await getToken({ req })
    if (!token) {
        return res.status(401)
    }
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
        console.log(data);
        const newComp = await prisma.companyProfile.create({data});
        return res.status(201).send(newComp)
    }
}