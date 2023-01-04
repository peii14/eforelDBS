import Layout from "@/components/Layout";
import Title from "@/components/Layout/Title";
import Neuromorphism from "@/components/Object/Neuromorphism";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    router.push("/");
    return <p>Access Denied</p>;
  }

  return (
    <Layout title="Dashboard" session={session}>
      <Title title="Dashboard" />
      <section className="flex flex-col gap-10 ">
        <Neuromorphism whichNeuro={1}>
          <div className="p-5">
            <h1 className="font-medium text-3xl mb-1">Overall Report</h1>
            <div className="flex flex-row justify-between w-full">
              <div className="grid grid-cols-2 gap-5">
                <div className="px-10 py-5 shadow-xl border-2 text-center rounded-3xl col-span-2">
                  <p className="mb-3 text-lg">Total Revenue (USD)</p>
                  <p className="text-xl">20</p>
                </div>
                <div className="text-center">
                  <p>PO rate</p>
                  <p>75%</p>
                </div>
                <div className="text-center">
                  <p>Target</p>
                  <p>Rp. 20</p>
                </div>
              </div>
            </div>
          </div>
        </Neuromorphism>
        <Neuromorphism whichNeuro={1}>
          <div className="p-5">
            <h2 className="font-normal">Top Customers</h2>
            <div className="flex flex-row justify-between">
              <table>
                <thead>
                  <tr>
                    <th className="p-5 text-left">Customer Name</th>
                    <th className="p-5 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr></tr>
                </tbody>
              </table>
            </div>
            <h2 className="font-normal mt-5">Top Products</h2>
            <div>
              <table>
                <thead>
                  <tr>
                    <th className="p-5 text-left">Customer Name</th>
                    <th className="p-5 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr></tr>
                </tbody>
              </table>
            </div>
          </div>
        </Neuromorphism>
      </section>
    </Layout>
  );
};

Dashboard.auth = true;
export default Dashboard;
