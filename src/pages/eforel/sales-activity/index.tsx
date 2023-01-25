import Layout from "@/components/Layout";
import Title from "@/components/Layout/Title";
import Neuromorphism from "@/components/Object/Neuromorphism";
import { useSession } from "next-auth/react";
import axios from "axios";
import { area } from "@/utils/area";
import { toast } from "react-toastify";
import { Suspense, useEffect, useReducer, useState } from "react";
import { reducer } from "@/utils/reducer";
import Link from "next/link";

const SalesActivity = () => {
  const { data: session }: any = useSession();

  const [{ loading, error, payloads, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  useEffect(() => {
    const getLastUpdate = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await toast.promise(
          axios.get("/api/salesActivity", {
            params: { whichSales: session.user.user_id },
          }),
          {
            pending: "Fetchin data",
            success: "Data fetched",
            error: "Something went wrong 🤯",
          }
        );

        if (data.length > 0) {
          dispatch({ type: "FETCH_SUCCESS", payload: data });
        }
      } catch (err) {
        console.log(err);
      }
    };
    getLastUpdate();
  }, []);
  return (
    <Layout session={session} title="Sales Activity">
      <Title title="Sales Activity " />
      <section className="gird gird-cols-5 max-w-md">
        <Suspense fallback="Loading...">
          <Link href={`/eforel/sales-activity/sales/${session.user.user_code}`}>
            <a>
              <Neuromorphism whichNeuro={2}>
                <div className="p-5 ">
                  <h2 className="text-center">{session.user.name}</h2>
                  <div className="grid grid-cols-2 gap-5 my-5">
                    <p>Area</p>
                    <p>{session.user.user_area}</p>
                    <p>Last Update</p>
                    {loading ? (
                      <p>Loading...</p>
                    ) : (
                      <p>{payloads[0].salesActivity_date}</p>
                    )}
                  </div>
                </div>
              </Neuromorphism>
            </a>
          </Link>
        </Suspense>
      </section>
    </Layout>
  );
};

SalesActivity.auth = true;
export default SalesActivity;
