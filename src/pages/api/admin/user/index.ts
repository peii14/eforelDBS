import { NextApiRequest, NextApiResponse } from "next";
import * as argon2 from "argon2";

const handler = async(req: NextApiRequest, res: NextApiResponse) =>{
    if(req.method === "GET"){
        const users = await prisma.user.findMany({})
        return res.status(200).send(users)
    }else if(req.method === "DELETE"){
        const user = await prisma.user.delete({
            where:{
                user_id: Number(req.query.id)
            }
        })
        res.revalidate('/admin/settings')
        res.json({ revalidated: true })
        return res.status(200).end()
    }else if(req.method === "POST"){
        try{
            const user = await prisma.user.create({
                data: {
                    user_email: "default@gmail.com",
                    user_fullname: "default",
                    user_role: 1,
                    user_password: await argon2.hash("123123123"),
                    user_area: 1,
                    user_code: "00",
                },
            });
            res.revalidate('/admin/settings')
            return res.status(200).send(user)
        }catch(error){
            return res.status(500).send(error)
        }
    } else if(req.method === "PUT"){
        const {user_name , user_email,user_area, user_code, user_role, user_password} = req.body
        try{
            const user = await prisma.user.update({
                where:{
                    user_email:"default@gmail.com",
                },
                data:{
                    user_fullname:user_name,
                    user_email: user_email,
                    user_area:Number(user_area),
                    user_password: await argon2.hash(user_password),
                    user_code: user_code,
                    user_role: Number(user_role)
                }
            })
            res.revalidate('/admin/settings')
            res.json({ revalidated: true })
            return res.status(200).end()
        }catch(error){
            return res.status(500).end()
        }
    }
}

export default handler