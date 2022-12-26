import Layout from "@/components/Layout";
import Title from "@/components/Layout/Title";
import Neuromorphism from "@/components/Object/Neuromorphism";
import Tab from "@/components/Object/Tab"
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";
// import { getStaticProps } from "./sales-activity";

export async function getServerSideProps(){
  const [Customer, Group, MOP, PIC, Quotation, SalesActivity, User, VerticalMarket] =  await Promise.all([
    prisma.customer.findMany(),
    prisma.group.findMany(),
    prisma.mOP.findMany(),
    prisma.pIC.findMany(),
    prisma.quotation.findMany(),
    prisma.salesActivity.findMany(),
    prisma.user.findMany(),
    prisma.verticalMarket.findMany(),
  ])

  return {
     props: {
      customer: Customer,
      group: JSON.parse(JSON.stringify(Group)),
      mop: MOP,
      pic: PIC,
      quotation: Quotation,
      salesActivity: JSON.parse(JSON.stringify(SalesActivity)),
      user: JSON.parse(JSON.stringify(User)),
      verticalMarket: JSON.parse(JSON.stringify(VerticalMarket)),
    }
  }
}

const Dashboard = ({ customer,group,mop,pic,quotation,salesActivity,user,verticalMarket }) => {
  // console.log(customer[20]);

  const originalArray = ['Customer', 'Group', 'MOP', 'PIC', 'Quotation', 'SalesActivity', 'User', 'VerticalMarket']
  const arrayOfObjects = []
  originalArray.forEach(value => {
    arrayOfObjects.push({ name: value })
  })

  const router = useRouter();
  const { data: session, status } = useSession();
  const [tabList, setTab] = useState(arrayOfObjects)
  const [whichTable, setWhichTable] = useState([])
  const [whichTab , setWhichTab] = useState(0)
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    router.push("/");
    return <p>Access Denied</p>;
  }

  // useEffect(()=>{
  //   whichTab === 0 ?  setWhichTable(Customer):
  //   setWhichTable(MOP)
  // },[whichTab])

  return (
    <Layout title="Dashboard" session={true}>
      <Title title="Dashboard" />
      <section className="flex flex-col gap-10">
        <Tab tab={tabList} table={whichTable} setTab={setWhichTab} whichTab={whichTab} />
      </section>
    </Layout>
  );
};

// export async function getStaticProps() {
//   const prisma = new PrismaClient()
//   const [Customer, MOP, Quotation] =  await Promise.all([prisma.customer.findMany({include:{
//     VerticalMarket:{
//       select:{
//         verticalMarket_name: true,
//       }
//     }
//   }}) ,prisma.mOP.findMany({select:{

//   }}),prisma.quotation.findMany({})])

//   return {
//     props: {

//     },
//     revalidate: 15,
//   }
// }


Dashboard.auth = true;
export default Dashboard;
