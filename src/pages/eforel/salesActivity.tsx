import Layout from "@/components/Layout";
import Title from "@/components/Layout/Title";
import Neuromorphism from "@/components/Object/Neuromorphism";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import axios from "axios";
import { area } from "@/utils/area";

const SalesActivity = () => {
  const { data: session }: any = useSession();
  useEffect(() => {
    const getLastUpdate = async () => {
      const { data } = await axios.get("/api/salesActivity", {
        params: { whichSales: session.user.user_id },
      });
      return data.data;
    };
    const salesActivity = getLastUpdate();
  });
  return (
    <Layout title="Sales Activity">
      <Title title="Sales Activity " />
      <section className="gird gird-cols-5 max-w-md">
        <Neuromorphism whichNeuro={1}>
          <div className="p-5 ">
            <h2 className="text-center">{session.user.name}</h2>
            <div className="grid grid-cols-2 gap-5 my-5">
              <p>Area</p>
              <p>{area[session.user.user_area].city}</p>
              <p>Last Update</p>
              <p></p>
            </div>
          </div>
        </Neuromorphism>
      </section>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
SalesActivity.auth = true;
export default SalesActivity;
