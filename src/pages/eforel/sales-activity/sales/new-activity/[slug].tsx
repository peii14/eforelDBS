import Layout from "@/components/Layout";
import Title from "@/components/Layout/Title";
import { PrismaClient } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import AutoCompleteBox from "@/components/Object/AutoCompleteBox";
import { renameKey } from "@/utils/renameKey";
import { filteredPeople } from "@/utils/filter";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import axios from "axios";
import { followup } from "@/utils/followup";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { useSession } from "next-auth/react";
import Neuromorphism from "@/components/Object/Neuromorphism";
import "react-datepicker/dist/react-datepicker.css";
import Button from "@/components/Object/Button";
import { useRouter } from "next/router";

interface ActivitiesProps {
  readonly path?: string;
  activities: {
    salesActivity_id?: number;
    salesActivity_date?: string;
    salesActivity_folowup?: string;
    salesActivity_jobdesc?: string;
    salesActivity_customerID?: number;
    salesActivity_customerName?: string;
  };
  customers: {
    customers_name?: string;
  };
}

const Activites = ({ path = "", activities, customers }: ActivitiesProps) => {
  const router = useRouter();
  const [customer_name, setCustomerNames]: any = useState(customers);
  const [selectedCustomerName, setName] = useState(
    activities.salesActivity_customerName
  );
  const [followups, setFollowups] = useState(followup);
  const [selectedFollowup, setSelectedFollowup]: any = useState(
    activities.salesActivity_folowup
  );
  const [date, setDate] = useState("");
  const [nameQuery, setNameQuery] = useState("");
  const [followupQuery, setFollowupQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  }: any = useForm();
  const { data: session }: any = useSession();

  useEffect(() => {
    try {
      if (nameQuery.length >= 1) {
        setCustomerNames(filteredPeople(nameQuery, customers));
      }
    } catch (error) {
      toast.error(error);
    }
  }, [nameQuery]);
  const submitHandler = async ({ jobDescription }) => {
    try {
      const customer_id = customer_name.find((element) => element.name);
      await toast.promise(
        axios.put(`/api/salesActivity/`, {
          jobDescription,
          customer_id: customer_id.customer_id,
          selectedFollowup: selectedFollowup.name,
          date,
          newActivityID: path,
        }),
        {
          pending: "Saving",
          success: "Data saved",
          error: "Something went wrong 🤯",
        }
      );
      router.push(`/eforel/sales-activity/sales/${session.user.user_code}`);
    } catch (err) {
      toast.error("You still have default activities");
    }
  };

  return (
    <Layout session={session} title="New Activities">
      <Title title="New Activities" />
      <form
        className="flex flex-row justify-around"
        onSubmit={handleSubmit(submitHandler)}
      >
        <section className="grid grid-cols-2 max-w-xl gap-y-5">
          <p>Nama Customer: </p>
          <AutoCompleteBox
            list={customer_name}
            selected={selectedCustomerName}
            query={nameQuery}
            setQuery={setNameQuery}
            setSelected={setName}
          />
          <p>Date</p>
          <div className=" flex flex-row items-center">
            <DatePicker selected={date} onChange={(date) => setDate(date)} />
            <BsFillCalendarDateFill className="text-2xl text-sec" />
          </div>
          <p>Follow up type</p>
          <AutoCompleteBox
            list={followups}
            selected={selectedFollowup}
            query={followupQuery}
            setQuery={setFollowupQuery}
            setSelected={setSelectedFollowup}
          />
          <p>Job description</p>
          <div>
            <textarea
              type="text"
              id="jobDescription"
              autoFocus
              {...register("jobDescription", {
                required: "Please enter Coupon jobDescription",
              })}
              className="rounded-xl px-3 py-0.5 border-2 w-full border-primary-400"
            />
            {errors.jobDescription && (
              <div className="text-red-500">
                {errors.jobDescription.message}
              </div>
            )}
          </div>
          <button className="w-1/2 mx-auto col-span-2 mt-5">
            <Button btn={`${loading ? "Loading" : "Save"}`} />
          </button>
        </section>
        <div className="h-max">
          <Neuromorphism whichNeuro={1}>
            <div className="p-5 text-center">
              <p>Sales Code:</p>
              <h1 className="text-5xl mt-2 text-sec">
                {session.user.user_code}
              </h1>
            </div>
          </Neuromorphism>
        </div>
      </form>
    </Layout>
  );
};

export async function getStaticPaths() {
  const prisma = new PrismaClient();
  const user = await prisma.salesActivity.findMany({
    select: {
      salesActivity_id: true,
    },
  });
  const users = user.map((post) => ({
    params: { slug: post.salesActivity_id.toString() },
  }));
  return {
    paths: users,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const prisma = new PrismaClient();
  let query: string = context.params.slug;

  const [activity, customers] = await Promise.all([
    prisma.salesActivity.findUnique({
      where: {
        salesActivity_id: Number(query),
      },
      include: {
        customer: {
          select: {
            customer_name: true,
          },
        },
      },
    }),
    prisma.customer.findMany({
      where: {
        salesActivity: {
          every: {
            salesActivity_customerID: Number(query),
          },
        },
      },
      select: {
        customer_name: true,
        customer_id: true,
      },
    }),
  ]);

  customers.forEach((obj) => renameKey(obj, "customer_name", "name"));
  return {
    props: {
      path: query,
      activities: {
        salesActivity_id: activity.salesActivity_id,
        salesActivity_date: activity.salesActivity_date.toString(),
        salesActivity_folowup: activity.salesActivity_followup,
        salesActivity_jobdesc: activity.salesActivity_jobDesc,
        salesActivity_customerID: activity.salesActivity_customerID,
        salesActivity_customerName: activity.customer.customer_name,
      },
      customers: customers,
    },
    revalidate: 10,
  };
}
Activites.auth = true;

export default Activites;
