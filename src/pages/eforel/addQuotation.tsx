import Layout from "@/components/Layout";
import Title from "@/components/Layout/Title";
import AutoCompleteBox from "@/components/Object/AutoCompleteBox";
import { useEffect, useState } from "react";
import axios from "axios";
import { renameKey } from "@/utils/renameKey";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Neuromorphism from "@/components/Object/Neuromorphism";
import { toast } from "react-toastify";
import { getError } from "@/utils/error";

const AddQuotation = () => {
  let [customer_name, setCustomerNames]: any = useState([{}]);
  let [pic_name, setPICNames]: any = useState([{}]);
  const [whichCustomer, setCustomer] = useState(customer_name[0]);
  const [whichPIC, setPIC] = useState(pic_name[0]);

  const { data: session }: any = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  }: any = useForm();
  const [nameQuery, setNameQuery] = useState("'-'");
  const [picQuery, setPicQuery] = useState("'-'");

  useEffect(() => {
    setIsLoading(true);
    const getCustomerName = async () => {
      const { data } = await axios.get("/api/customer", {
        params: { q: nameQuery },
      });
      data.forEach((obj) => renameKey(obj, "cust_name", "name"));
      setCustomerNames(data);
    };
    getCustomerName();
    setIsLoading(false);
  }, [nameQuery]);

  useEffect(() => {
    try {
      const getPIC = async () => {
        const { data } = await axios.get("/api/pic", {
          params: { q: picQuery },
        });
        data.forEach((obj) => renameKey(obj, "P_name", "name"));
        setPICNames(data);
      };
      getPIC();
    } catch (err) {
      toast.error(err);
    }
  }, [picQuery]);

  const submitHandler = async ({ vertical_market, group }) => {
    try {
      const salesCode = session.user.user_code;
      await axios.post("/api/vertical_market", {
        cust_name: vertical_market,
        cust_code: group,
      });
    } catch (err) {
      toast.error(getError(err));
    }
    toast.success("Customer has been added");
  };
  return (
    <Layout title="Add Quotation">
      <Title title="Add Quotation" />
      <section className="flex flex-col space-y-10">
        <div className="grid w-max items-center mx-auto gap-5 grid-cols-3">
          <p>Choose Customer</p>
          <div className="col-span-2">
            {isLoading ? (
              <p>Loading</p>
            ) : (
              <AutoCompleteBox
                list={customer_name}
                selected={whichCustomer}
                query={nameQuery}
                setQuery={setNameQuery}
                setSelected={setCustomer}
              />
            )}
          </div>
          <p>Choose PIC</p>
          <div className="col-span-2">
            {isLoading ? (
              <p>Loading</p>
            ) : (
              <AutoCompleteBox
                list={pic_name}
                selected={whichPIC}
                query={picQuery}
                setQuery={setPicQuery}
                setSelected={setPIC}
              />
            )}
          </div>
        </div>
        <Neuromorphism whichNeuro={1}>
          <div className="p-5 grid-cols-4 gap-5 items-center grid">
            <p>Nama Customer</p>
            <div className="col-span-2 min-h-max border-2 border-sec px-3 py-1.5 rounded-xl">
              {whichCustomer ? `${whichCustomer.name}` : ""}
            </div>
            <div className="row-span-5 border-2 w-max p-5 mx-auto shadow-xl rounded-3xl text-center border-gray-800">
              <p>Sales Code</p>
              <h1 className="text-sec text-5xl">{session.user.user_code}</h1>
            </div>
            <p>Customer Code</p>
            <div className="col-span-2 min-h-max border-2 border-sec px-3 py-1.5 rounded-xl">
              {whichCustomer ? `${whichCustomer.cust_code}` : ""}
            </div>
            <p>Area</p>
            <div className="col-span-2 min-h-max border-2 border-sec px-3 py-1.5 rounded-xl">
              {whichCustomer ? `${whichCustomer.city}` : ""}
            </div>
            <p>Vertical Market</p>
            <div className="col-span-2 min-h-max border-2 border-sec px-3 py-1.5 rounded-xl">
              {whichCustomer ? `${whichCustomer.postal_code}` : ""}
            </div>
            <p>Group</p>
            <div className="col-span-2 min-h-max border-2 border-sec px-3 py-1.5 rounded-xl">
              {whichCustomer ? `${whichCustomer.postal_code}` : ""}
            </div>
          </div>
        </Neuromorphism>
        <div className="flex flex-row gap-10 items-center">
          <Neuromorphism whichNeuro={1}>
            <div className="p-5 grid-cols-4 mx-auto gap-5 items-center grid">
              <p>Nama PIC</p>
              <div className="min-h-max col-span-3 border-2 border-sec px-3 py-1.5 rounded-xl">
                {whichPIC ? `${whichPIC.name}` : ""}
              </div>
              <p>Posisi</p>
              <div className="min-h-max col-span-3 border-2 border-sec px-3 py-1.5 rounded-xl">
                {whichPIC ? `${whichPIC.P_position}` : ""}
              </div>
              <p>Email</p>
              <div className="min-h-max  col-span-3 border-2 border-sec px-3 py-1.5 rounded-xl">
                {whichPIC ? `${whichPIC.P_email}` : ""}
              </div>
              <p>Phone</p>
              <div className="min-h-max col-span-3 border-2 border-sec px-3 py-1.5 rounded-xl">
                {whichPIC ? `${whichPIC.P_phone}` : ""}
              </div>
            </div>
          </Neuromorphism>
          <Neuromorphism whichNeuro={1}>
            <div className="p-5 grid grid-cols-4 gap-5 mx-auto">
              <p>Alamat Customer</p>
              <div className="col-span-3 min-h-max border-2 border-sec px-3 py-1.5 rounded-xl">
                {whichCustomer ? `${whichCustomer.address}` : ""}
              </div>
              <p>Kota</p>
              <div className="col-span-3 min-h-max border-2 border-sec px-3 py-1.5 rounded-xl">
                {whichCustomer ? `${whichCustomer.city}` : ""}
              </div>
              <p>Provinsi</p>
              <div className="col-span-3 min-h-max border-2 border-sec px-3 py-1.5 rounded-xl">
                {whichCustomer ? `${whichCustomer.province}` : ""}
              </div>
              <p>Kode Pos</p>
              <div className="col-span-3 min-h-max border-2 border-sec px-3 py-1.5 rounded-xl">
                {whichCustomer ? `${whichCustomer.postal_code}` : ""}
              </div>
              <p>Telp. Customer</p>
              <div className="col-span-3 min-h-max border-2 border-sec px-3 py-1.5 rounded-xl">
                {whichCustomer ? `${whichCustomer.cust_phone}` : ""}
              </div>
            </div>
          </Neuromorphism>
        </div>
        <Neuromorphism whichNeuro={1}>
          <div className="p-5 grid grid-cols-5 gap-5">
            <p>Quotation Value (Rp)</p>
            <div className="col-span-4">
              <input
                {...register("Quotation_value", {
                  required: "Please enter Quotation Value",
                })}
                className="px-2 w-full"
              />
              {errors.quotation_value && (
                <div className="text-red-500">
                  {errors.group.quotation_value}
                </div>
              )}
            </div>
            <p>Product</p>
            <div className="col-span-2">
              <input
                {...register("Quotation_value", {
                  required: "Please enter Quotation Value",
                })}
                className="px-2 w-full"
              />
              {errors.quotation_value && (
                <div className="text-red-500">
                  {errors.group.quotation_value}
                </div>
              )}
            </div>
            <p>Qty</p>
            <div className="col-span-1">
              <input
                {...register("Quotation_value", {
                  required: "Please enter Quotation Value",
                })}
                className="px-2 w-full"
                type="number"
              />
              {errors.quotation_value && (
                <div className="text-red-500">
                  {errors.group.quotation_value}
                </div>
              )}
            </div>
          </div>
        </Neuromorphism>
      </section>
    </Layout>
  );
};

AddQuotation.auth = true;
export default AddQuotation;
