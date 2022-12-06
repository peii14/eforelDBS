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
        return res.status(200)
    }else if(req.method === "PUT"){
        const user = await prisma.user.create({
            data: {
              user_email: "template@gmail.com",
              user_fullname: "admin",
              user_isAdmin: true,
              user_password: await argon2.hash("123123123"),
              user_area: 1,
              user_code: "BD",
            },
          });
          return res.status(200)
    }
}

export default handler