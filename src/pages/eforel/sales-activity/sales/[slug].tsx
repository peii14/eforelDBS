import Layout from "@/components/Layout";
import Title from "@/components/Layout/Title";
import Button from "@/components/Object/Button";
import Neuromorphism from "@/components/Object/Neuromorphism";
import { reducer } from "@/utils/reducer";
import { PrismaClient } from "@prisma/client";
import { useState, useReducer, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";

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
  const router = useRouter();
  const [refresh, setRefresh] = useState(false);
  const [
    { loading, error, payloads, loadingCreate, successDelete, loadingDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    payloads: [],
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get("/api/salesActivity");
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, [refresh]);

  const addHandler = async () => {
    try {
      const activities = await toast.promise(axios.post("/api/salesActivity"), {
        pending: "Creating activities",
        success: "Activities Created",
        error: "Something went wrong 🤯",
      });
      router.push(
        `/eforel/sales-activity/sales/new-activity/${activities.data.salesActivity_id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (id: number) => {
    setRefresh(!refresh);
    try {
      const activities = await toast.promise(
        axios.delete("/api/salesActivity", { params: { q: id } }),
        {
          pending: "Creating activities",
          success: "Activities Created",
          error: "Something went wrong 🤯",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Sales Activity">
      <Title title="Sales" />
      <section className="flex flex-row space-x-10">
        <h1 className="text-5xl">{users.user_fullname}</h1>
        <button className="" onClick={addHandler}>
          <Button btn="+ Add Activity" />
        </button>
      </section>
      <section>
        <div className="mt-10 max-h-screen overflow-y-auto">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="overflow-x-auto h-full overflow-y-auto relative">
              <table
                className={`${
                  loading ? "animate-pulse duration-100" : ""
                } min-w-full `}
              >
                <thead className="border-y-2 border-sec sticky">
                  <tr>
                    <th className="px-5 text-left">ID</th>
                    <th className="p-5 text-left">Date</th>
                    <th className="p-5 text-left">Customer Name</th>
                    <th className="p-5 text-left">Follow Up Type</th>
                    <th className="p-5 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    payloads.map((product) => (
                      <tr
                        key={product.salesActivity_id}
                        className="border-b-2 border-sec border-double border-opacity-20"
                      >
                        <td className=" p-5 ">
                          {product.salesActivity_id.toString()}
                        </td>
                        <td className=" p-5 ">
                          {product.salesActivity_date.toString()}
                        </td>
                        <td className=" p-5 ">
                          {product.customer.customer_name.toString()}
                        </td>
                        <td className=" p-5 ">
                          {product.salesActivity_followup.toString()}
                        </td>
                        <td className=" p-5 flex flex-row  space-x-3 ">
                          <Link
                            className=""
                            href={`/eforel/sales-activity/sales/new-activity/${product.salesActivity_id}`}
                          >
                            <a className="">
                              <Button btn="Edit" />
                            </a>
                          </Link>
                          <button
                            onClick={() =>
                              deleteHandler(product.salesActivity_id)
                            }
                            className="default-button"
                            type="button"
                          >
                            <p className="px-5 py-1 border-2 hover:bg-primary-500 hover:text-white border-primary rounded-full">
                              Delete
                            </p>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
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
Users.auth = true;
export default Users;
