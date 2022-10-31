import Layout from "@/components/Layout";
import Title from "@/components/Layout/Title";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Dashboard = () => {
  // const router = useRouter();
  // const { data: session, status } = useSession();

  // if (status === "loading") {
  //   return <p>Loading...</p>;
  // }

  // if (status === "unauthenticated") {
  //   router.push("/");
  //   return <p>Access Denied</p>;
  // }

  return (
    <Layout title="Dashboard" session={true}>
      <Title title="Dashboard" />
      <div></div>
    </Layout>
  );
};

export default Dashboard;
