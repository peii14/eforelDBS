import Layout from "@/components/Layout";
import Title from "@/components/Layout/Title";
import Neuromorphism from "@/components/Object/Neuromorphism";
import Tabs from "@/components/Object/Tab";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";
// import { getStaticProps } from "./sales-activity";

const Dashboard = ({
  customer,
  group,
  mop,
  pic,
  quotation,
  salesActivity,
  user,
  verticalMarket,
}) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [tabList, setTab] = useState([
    { name: "Customer" },
    { name: "Group" },
    { name: "MOP" },
    { name: "PIC" },
    { name: "Quotation" },
    { name: "Sales Activity" },
    { name: "User" },
    { name: "Vertical Market" },
  ]);

  const [whichTable, setWhichTable] = useState(
    Object.keys(customer[0]).map((keys) => ({
      title: keys.split("_")[1],
    }))
  );
  const [whichTab, setWhichTab] = useState(0);
  const [whichContent, setWhichContent] = useState([]);
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    router.push("/");
    return <p>Access Denied</p>;
  }
  useEffect(() => {
    switch (whichTab) {
      case 0:
        setWhichTable(
          Object.keys(customer[0]).map((keys) => ({
            title: keys.split("_")[1],
          }))
        );
        setWhichContent(customer);
        break;
      case 1:
        setWhichTable(
          Object.keys(group[0]).map((keys) => ({
            title: keys.split("_")[1],
          }))
        );
        setWhichContent(group);
        break;
      case 2:
        setWhichTable(
          Object.keys(mop[0]).map((keys) => ({
            title: keys.split("_")[1],
          }))
        );
        setWhichContent(mop);
        break;
      case 3:
        setWhichTable(
          Object.keys(pic[0]).map((keys) => ({
            title: keys.split("_")[1],
          }))
        );
        setWhichContent(pic);
        break;
      case 4:
        setWhichTable(
          Object.keys(quotation[0]).map((keys) => ({
            title: keys.split("_")[1],
          }))
        );
        setWhichContent(quotation);
        break;
      case 5:
        setWhichTable(
          Object.keys(salesActivity[0]).map((keys) => ({
            title: keys.split("_")[1],
          }))
        );
        setWhichContent(salesActivity);
        break;
      case 6:
        setWhichTable(
          Object.keys(user[0]).map((keys) => ({
            title: keys.split("_")[1],
          }))
        );
        setWhichContent(user);
        break;
      case 7:
        setWhichTable(
          Object.keys(verticalMarket[0]).map((keys) => ({
            title: keys.split("_")[1],
          }))
        );
        setWhichContent(verticalMarket);
        break;
    }
  }, [whichTab]);

  return (
    <Layout title="Dashboard" session={session}>
      <Title title="Dashboard" />
      <section className="">
        <Neuromorphism whichNeuro={1}>
          <Tabs
            tab={tabList}
            table={whichTable}
            contents={whichContent}
            setTab={setWhichTab}
            whichTab={whichTab}
          />
        </Neuromorphism>
      </section>
    </Layout>
  );
};
export async function getStaticProps() {
  const prisma = new PrismaClient();
  const [
    Customer,
    Group,
    MOP,
    PIC,
    Quotation,
    SalesActivity,
    User,
    VerticalMarket,
  ] = await Promise.all([
    prisma.customer.findMany(),
    prisma.group.findMany(),
    prisma.mOP.findMany(),
    prisma.pIC.findMany(),
    prisma.quotation.findMany(),
    prisma.salesActivity.findMany(),
    prisma.user.findMany(),
    prisma.verticalMarket.findMany(),
  ]);

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
    revalidate: 60,
  };
}

Dashboard.auth = true;
export default Dashboard;
