import Layout from "@/components/Layout";
import Title from "@/components/Layout/Title";
import AutoCompleteBox from "@/components/Object/AutoCompleteBox";
import Neuromorphism from "@/components/Object/Neuromorphism";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

const AddPIC = () => {
  let [customer_name, setCustomerNames]: any = useState([{}]);
  const [whichCustomer, setCustomer] = useState(customer_name[0]);
  const { data: session }: any = useSession();

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  }: any = useForm();

  useEffect(() => {
    const getCustomerName = async () => {
      const { data } = await axios.get("/api/customer", {
        params: { param: "nameOnly" },
      });
      setCustomerNames(data);
      // console.log(data[0].cust_name);
    };
    getCustomerName();
    console.log(customer_name[0].cust_name);
  }, [2]);
  return (
    <Layout title="Add PIC">
      <Title title="Add PIC" />
      <section className="grid grid-cols-3 gap-10 ">
        <div className="col-span-2 ">
          <Neuromorphism whichNeuro={1}>
            <div className="p-5 flex flex-row items-center justify-between">
              <p>Customer Name:</p>
              <AutoCompleteBox
                list={customer_name}
                selected={whichCustomer}
                setSelected={setCustomer}
              />
            </div>
          </Neuromorphism>
        </div>
        <Neuromorphism whichNeuro={1}>
          <div className="p-5 text-center">
            <p>Sales Code:</p>
            <h1 className="text-5xl mt-2 text-sec">{session.user.user_code}</h1>
          </div>
        </Neuromorphism>
      </section>
    </Layout>
  );
};

AddPIC.auth = true;
export default AddPIC;
