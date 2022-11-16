import { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
){

    if(req.method === "GET")
    {
        const users = await prisma.user.findMany({
            where: {
                Sales_Activity_S_ID: 1
            },
            include:{
                salesActivity: true
            }
        });
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