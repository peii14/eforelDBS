import Layout from "@/components/Layout";
import Title from "@/components/Layout/Title";
import Neuromorphism from "@/components/Object/Neuromorphism";
import { useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { toast } from "react-toastify";
import { Suspense, useEffect, useReducer, useState } from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";

const SalesActivity = ({ areaUser }) => {
  const { data: session }: any = useSession();
  const [sales, setSales] = useState([]);
  useEffect(() => {
    if (!Array.isArray(JSON.parse(areaUser))) {
      setSales([JSON.parse(areaUser)]);
    } else {
      setSales(JSON.parse(areaUser));
    }
  }, []);
  return (
    <Layout session={session} title="Sales Activity">
      <Title title="Sales Activity " />
      <section className="grid grid-cols-2 gap-10">
        {sales.map((data, idx) => (
          <Suspense key={idx} fallback="Loading...">
            <Link
              className="w-11/12"
              href={`/eforel/sales-activity/sales/${data.user_code}`}
            >
              <a>
                <Neuromorphism whichNeuro={2}>
                  <div className="p-5 relative">
                    <div
                      className={`z-0 absolute right-0 ${
                        data.user_role === "Master"
                          ? "bg-red-600 text-white"
                          : data.user_role === "Admin"
                          ? "bg-primary text-white"
                          : "bg-third"
                      }  rounded-full px-5 py-1 `}
                    >
                      <p>Role: {data.user_role}</p>
                    </div>
                    <h2 className="text-center">{data.user_fullname}</h2>
                    <div className="grid grid-cols-2 gap-5 my-5">
                      <p>Area</p>
                      <p>{data.user_area}</p>
                      <p>Sales Code</p>
                      <p>{data.user_code}</p>
                      <p>Sales Area</p>
                      <p>{data.user_area}</p>
                    </div>
                  </div>
                </Neuromorphism>
              </a>
            </Link>
          </Suspense>
        ))}
      </section>
    </Layout>
  );
};
export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  let areaUser: any = [];
  const token = await getToken({ req });
  const prisma = new PrismaClient();
  if (token.user_role === "Admin") {
    areaUser = await prisma.user.findMany({
      where: {
        user_area: {
          equals: token.user_area.toString(),
        },
      },
    });
  } else if (token.user_role === "Master") {
    areaUser = await prisma.user.findMany({});
  } else if (token.user_role === "Sales") {
    areaUser = await prisma.user.findUnique({
      where: {
        user_code: token.user_code.toString(),
      },
    });
  }

  return {
    props: {
      areaUser: JSON.stringify(areaUser),
    },
  };
}

SalesActivity.auth = true;
export default SalesActivity;
