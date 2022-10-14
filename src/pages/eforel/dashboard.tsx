import Layout from "@/components/Layout";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const Dashboard = () => {
  return (
    <Layout title="Dashboard" session={true}>
      <div></div>
    </Layout>
  );
};

export default Dashboard;
