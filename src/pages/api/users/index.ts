import { NextApiRequest, NextApiResponse } from 'next'
import { sampleUserData } from '../../../utils/sample-data'
import { PrismaClient } from '@prisma/client'

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ){
//   const prisma = new PrismaClient();

//   if (req.method === 'GET'){
//     const user = await prisma.user.findMany();
//     return res.send(user)
//   }
//   else if(req.method === 'POST'){
//   res.status(201).send('POST');
//   }
// }



const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!Array.isArray(sampleUserData)) {
      throw new Error('Cannot find user data')
    }

    res.status(200).json(sampleUserData)
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
