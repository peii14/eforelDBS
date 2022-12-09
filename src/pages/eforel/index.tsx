import Layout from "@/components/Layout";
import Title from "@/components/Layout/Title";
import Neuromorphism from "@/components/Object/Neuromorphism";
import Tab from "@/components/Object/Tab"
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [tabList, setTab] = useState([
    {
      name: "Customer"
    },
    {
      name: "MOP",
    }
  ])
  const [whichTable, setWhichTable] = useState([])
  const [whichTab , setWhichTab] = useState(0)
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    router.push("/");
    return <p>Access Denied</p>;
  }

  const Customer = useState([
    {
      id: 1,
      Name: 'Adam',
      Area: 'Jakarta',
      Vertical_Market: 'Cormier Inc',
      Group: "hub",
      Alamat: 'jalan kontol',
      Kota: 'Jakarta',
      Telpon: '123123'
    },
    {
      id: 2,
      Name: 'Adam',
      Area: 'Jakarta',
      Vertical_Market: 'Cormier Inc',
      Group: "hub",
      Alamat: 'jalan kontol',
      Kota: 'Jakarta',
      Telpon: '123123'
    },
  ])
  const MOP = useState([
    {
      id: 1,
      mop_number: '5pk1ri1',
      mop_value: 'Cheese',
      customer_name: 'Adam',
      quotation_number: '89ai2kd',
      quotation_value: '20000',
      quotation_product: 'motor',
      quotation_quantity: '8',
    },
  ])

  useEffect(()=>{
    whichTab === 0 ?  setWhichTable(Customer):
    setWhichTable(MOP)
  },[whichTab])

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
