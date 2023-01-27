import Layout from "@/components/Layout";
import Title from "@/components/Layout/Title";
import Neuromorphism from "@/components/Object/Neuromorphism";
import Tabs from "@/components/Object/Tab";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";
// import { getStaticProps } from "./sales-activity";

const Dashboard = ({
  customer,
  group,
  mop,
  pic,
  quotation,
  salesActivity,
  verticalMarket,
}) => {
  const router = useRouter();
  const { data: session, status }: any = useSession();
  const [tabList, setTab] = useState([]);

  const [whichTable, setWhichTable] = useState(
    customer[0] &&
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
    if (session.user.role === "Master" || session.user.role === "Admin") {
      setTab([
        { name: "Customer" },
        { name: "MOP" },
        { name: "PIC" },
        { name: "Quotation" },
        { name: "Sales Activity" },
        { name: "Group" },
        { name: "Vertical Market" },
      ]);
    } else if (session.user.role === "Sales") {
      setTab([
        { name: "Customer" },
        { name: "MOP" },
        { name: "PIC" },
        { name: "Quotation" },
      ]);
    }
  }, []);
  useEffect(() => {
    try {
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
            Object.keys(mop[0]).map((keys) => ({
              title: keys.split("_")[1],
            }))
          );
          setWhichContent(mop);
          break;
        case 2:
          setWhichTable(
            Object.keys(pic[0]).map((keys) => ({
              title: keys.split("_")[1],
            }))
          );
          setWhichContent(pic);
          break;
        case 3:
          setWhichTable(
            Object.keys(quotation[0]).map((keys) => ({
              title: keys.split("_")[1],
            }))
          );
          setWhichContent(quotation);
          break;
        case 4:
          setWhichTable(
            Object.keys(salesActivity[0]).map((keys) => ({
              title: keys.split("_")[1],
            }))
          );
          setWhichContent(salesActivity);
          break;
        case 5:
          setWhichTable(
            Object.keys(group[0]).map((keys) => ({
              title: keys.split("_")[1],
            }))
          );
          setWhichContent(group);
          break;
        case 6:
          setWhichTable(
            Object.keys(verticalMarket[0]).map((keys) => ({
              title: keys.split("_")[1],
            }))
          );
          setWhichContent(verticalMarket);
          break;
      }
    } catch (error) {
      console.log(error);
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
  const [Customer, Group, MOP, PIC, Quotation, SalesActivity, VerticalMarket] =
    await Promise.all([
      prisma.customer.findMany(),
      prisma.group.findMany(),
      prisma.mOP.findMany(),
      prisma.pIC.findMany(),
      prisma.quotation.findMany(),
      prisma.salesActivity.findMany(),
      prisma.verticalMarket.findMany(),
    ]);
  return {
    props: {
      customer: Customer,
      group: JSON.parse(JSON.stringify(Group)),
      mop: JSON.parse(JSON.stringify(MOP)),
      pic: JSON.parse(JSON.stringify(PIC)),
      quotation: JSON.parse(JSON.stringify(Quotation)),
      salesActivity: JSON.parse(JSON.stringify(SalesActivity)),
      verticalMarket: JSON.parse(JSON.stringify(VerticalMarket)),
    },
    revalidate: 60,
  };
}

Dashboard.auth = true;
export default Dashboard;
