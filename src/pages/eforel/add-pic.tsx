import Layout from "@/components/Layout";
import Title from "@/components/Layout/Title";
import AutoCompleteBox from "@/components/Object/AutoCompleteBox";
import Neuromorphism from "@/components/Object/Neuromorphism";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getError } from "@/utils/error";
import Button from "@/components/Object/Button";
import { renameKey } from "@/utils/renameKey";

const AddPIC = () => {
  let [customer_name, setCustomerNames]: any = useState([{}]);
  const [whichCustomer, setCustomer] = useState(customer_name[0]);
  const { data: session }: any = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  }: any = useForm();
  const [query, setQuery] = useState("''");

  useEffect(() => {
    try {
      setIsLoading(true);
      const getCustomerName = async () => {
        const { data } = await axios.get("/api/customer", {
          params: { q: query, salesCode: session.user.user_code },
        });
        data.forEach((obj) => renameKey(obj, "customer_name", "name"));
        setCustomerNames(data);
      };
      getCustomerName();
      setIsLoading(false);
    } catch (err) {
      toast.error(err);
    }
  }, [query]);

  const submitHandler = async ({ name, position, email, phone }) => {
    try {
      const salesCode = session.user.user_code;
      await toast.promise(
        axios.post("/api/pic", {
          pic_name: name,
          pic_position: position,
          pic_email: email,
          pic_phone: phone,
          pic_sales_code: salesCode,
          pic_customerID: whichCustomer.customer_id,
        }),
        {
          pending: "Adding PIC",
          success: "PIC has been added",
          error: "Error",
        }
      );
    } catch (err) {
      return toast.error(getError(err));
    }
  };
  return (
    <Layout session={session} title="Add PIC">
      <Title title="Add PIC" />
      <form onSubmit={handleSubmit(submitHandler)}>
        <section className="grid grid-cols-3 gap-10 ">
          <div className="col-span-2 ">
            <Neuromorphism whichNeuro={1}>
              <div className="p-5 flex flex-row items-center justify-between">
                <p>Customer Name:</p>
                {isLoading ? (
                  <p>Loading</p>
                ) : (
                  <AutoCompleteBox
                    list={customer_name}
                    selected={whichCustomer}
                    query={query}
                    setQuery={setQuery}
                    setSelected={setCustomer}
                  />
                )}
              </div>
            </Neuromorphism>
          </div>
          <Neuromorphism whichNeuro={1}>
            <div className="p-5 text-center">
              <p>Sales Code:</p>
              <h1 className="text-5xl mt-2 text-sec">
                {session.user.user_code}
              </h1>
            </div>
          </Neuromorphism>
          <div className="col-span-3 w-2/3 mx-auto">
            <Neuromorphism whichNeuro={1}>
              <div className="p-5 grid grid-cols-3 gap-5">
                <p>Nama PIC</p>
                <div className="col-span-2">
                  <input
                    {...register("name", {
                      required: "Please enter name",
                    })}
                    className="px-2 w-full"
                  />
                  {errors.name && (
                    <div className="text-red-500">{errors.name.message}</div>
                  )}
                </div>
                <p>Posisi</p>
                <div className="col-span-2">
                  <input
                    {...register("position", {
                      required: "Please enter position",
                    })}
                    className="px-2 w-full"
                  />
                  {errors.position && (
                    <div className="text-red-500">
                      {errors.position.message}
                    </div>
                  )}
                </div>
                <p>Email</p>
                <div className="col-span-2">
                  <input
                    type="email"
                    {...register("email", {
                      required: "Please enter email",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                        message: "Please enter valid email",
                      },
                    })}
                    className={`w-full px-1 py-0.5 ${
                      errors.email ? "ring-1 ring-red-600" : ""
                    } `}
                    id="email"
                  />
                  {errors.email && (
                    <div className="text-red-500">{errors.email.message}</div>
                  )}
                </div>
                <p>Phone</p>
                <div className="col-span-2">
                  <input
                    {...register("phone", {
                      required: "Please enter phone",
                    })}
                    className="px-2 w-full"
                  />
                  {errors.phone && (
                    <div className="text-red-500">{errors.phone.message}</div>
                  )}
                </div>
              </div>
            </Neuromorphism>
          </div>
        </section>
        <div className="w-full mt-5 ">
          <div className="w-1/3 mx-auto">
            <button className="w-full">
              <Button btn="Add PIC" />
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

AddPIC.auth = true;
export default AddPIC;
