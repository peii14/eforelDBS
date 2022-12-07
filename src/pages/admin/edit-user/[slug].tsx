import Layout from "@/components/Layout";
import Title from "@/components/Layout/Title";
import { PrismaClient } from "@prisma/client";

const EditUser = ({ users }) => {
  console.log(users);
  return (
    <Layout title="Edit User">
      <Title title="Edit User" />
      <section></section>
    </Layout>
  );
};

export async function getStaticPaths() {
  const prisma = new PrismaClient();

  const users = await prisma.user.findMany({
    select: {
      user_code: true,
    },
  });
  const categories = users.map((post) => ({
    params: { slug: post.user_code },
  }));
  return {
    paths: categories,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  let query: string = context.params.token;
  const prisma = new PrismaClient();

  const users = await prisma.user.findUnique({
    where: {
      user_code: query,
    },
  });

  return {
    props: { users },
    revalidate: 10,
  };
}

export default EditUser;
