import Layout from "@/components/Layout";
import Title from "@/components/Layout/Title";
import Neuromorphism from "@/components/Object/Neuromorphism";
import Tab from "@/components/Object/Tab"
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";
// import { getStaticProps } from "./sales-activity";

export async function getStaticProps(){
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
    },
    revalidate: 60
  }
}

const Dashboard = ({ customer,group,mop,pic,quotation,salesActivity,user,verticalMarket }) => {
  // console.log(customer[0]);
  // console.log(Object.keys(customer[0]))

  const tablistArray = ['Customer', 'Group', 'MOP', 'PIC', 'Quotation', 'SalesActivity', 'User', 'VerticalMarket']
  const tabListObj = []
  tablistArray.forEach(value => {
    tabListObj.push({ name: value })
  })

  const tabPanelsArray = Object.keys(customer[0]);
  const filterTxt = []
  tabPanelsArray.forEach(value =>{filterTxt.push(value.replace("customer_", ""))})
  const tabPanelObj = []
  filterTxt.forEach(value => {
    tabPanelObj.push({ title: value })
  })

  const contentList = Object.values(customer[0]);
  const filterContent = contentList.map(value => {
    if(value === null){
    return "--";
    }else{
    return value;
    }
    });
  const content = []
  filterContent.forEach(value=> {
    content.push({content: value})
  })


  console.log(Object.values(customer));

  const router = useRouter();
  const { data: session, status } = useSession();
  const [tabList, setTab] = useState(tabListObj);
  const [whichTable, setWhichTable] = useState(tabPanelObj);
  const [contentTable, subtable] = useState(content);
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
    <Layout title="Dashboard" session={session}>
      <Title title="Dashboard" />
      <section className="flex flex-col gap-10">
        <Tab tab={tabList} table={whichTable} subtable={contentTable} setTab={setWhichTab} whichTab={whichTab} />
      </section>
    </Layout>
  );
};

Dashboard.auth = true;
export default Dashboard;
