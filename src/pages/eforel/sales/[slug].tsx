import Layout from "@/components/Layout";
import Title from "@/components/Layout/Title";
import { PrismaClient } from "@prisma/client";

interface UserProps {
  readonly query?: string;
  users: {
    user_id?: number;
    user_fullname?: string;
    user_email?: string;
    user_area?: number;
    user_code?: string;
  };
}

const Users = ({ query, users }: UserProps) => {
  return (
    <Layout title="Sales Activity">
      <Title title="Sales" />
      <section>{users.user_fullname}</section>
    </Layout>
  );
};

export async function getStaticPaths() {
  const prisma = new PrismaClient();
  const user = await prisma.user.findMany({
    select: {
      user_id: true,
    },
  });
  const users = user.map((post) => ({
    params: { slug: post.user_id.toString() },
  }));
  console.log(users);
  return {
    paths: users,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const prisma = new PrismaClient();
  let query: string = context.params.slug;
  const user = await prisma.user.findUnique({
    where: {
      user_id: Number(query),
    },
  });

  return {
    props: {
      path: query,
      users: {
        user_id: user.user_id,
        user_fullname: user.user_fullname,
        user_email: user.user_email,
        user_area: user.user_area,
        user_code: user.user_code,
      },
    },
    revalidate: 120,
  };
}
export default Users;
