import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req:NextApiRequest,res: NextApiResponse) => {
    if(req.method === "POST"){
        const vm = await prisma.verticalMarket.create({data:{
            verticalMarket_name: req.body.verticalMarket_name.toString()
        }})
        if(req.body.group != '-'){
        await prisma.group.create({data:{
            group_name: req.body.group.toString(),
            group_verticalMarket: vm.verticalMarket_id
        }})
        }
        return res.status(200).send("OK")
    }else if(req.method === "GET"){
        const result = await prisma.verticalMarket.findMany({})
        return res.status(200).send(result)
    }
}

export default handler