import Layout from "@/components/Layout";
import Title from "@/components/Layout/Title";
import { useEffect, useState } from "react";
import axios from "axios";
import { renameKey } from "@/utils/renameKey";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Neuromorphism from "@/components/Object/Neuromorphism";
import { toast } from "react-toastify";
import { getError } from "@/utils/error";
import Button from "@/components/Object/Button";
import AutoCompleteBox from "@/components/Object/AutoCompleteBox";

const AddMOP = () => {
  const [isLoading, setIsLoading] = useState(false);
  let [mop, setMOP]: any = useState([{}]);

  const [whichMOP, setWhichMOP] = useState(mop[0]);
  const [whichGroup, setWhichGroup] = useState(null);

  const { data: session }: any = useSession();

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  }: any = useForm();
  const [mopQuery, setmopQuery] = useState("'-'");

  useEffect(() => {
    try {
      if (mopQuery.length >= 2) {
        setIsLoading(true);
        const getQuotation = async () => {
          const { data } = await toast.promise(
            axios.get("/api/quotation", {
              params: { q: mopQuery, type: "nameOnly" },
            }),
            {
              pending: "Fetching customer data",
              success: "Data fethced",
            }
          );
          data.forEach((obj) => renameKey(obj, "quotation_num", "name"));
          setMOP(data);
        };
        getQuotation();
        setIsLoading(false);
      }
    } catch (err) {
      toast.error(err);
    }
  }, [mopQuery]);

  useEffect(() => {
    const getData = async () => {
      if (whichMOP.customer && whichMOP.customer.length != 0) {
        console.log(whichMOP.customer.customer_groupID);
        const group = await toast.promise(
          axios.get("/api/group", {
            params: { id: 2 },
          }),
          {
            pending: "Fetching Group",
          }
        );
        setWhichGroup(group.data);
      } else {
        setWhichGroup(null);
      }
    };
    getData();
  }, [whichMOP]);

  const submitHandler = async ({ vertical_market, group }) => {
    try {
      const salesCode = session.user.user_code;
      await axios.post("/api/mop", {});
    } catch (err) {
      toast.error(getError(err));
    }
    toast.success("Customer has been added");
  };

  return (
    <Layout title="Add MOP">
      <Title title="Add MOP" />
      <form onSubmit={handleSubmit(submitHandler)}>
        <section className="flex flex-col space-y-10">
          <div className="grid w-max items-center mx-auto gap-5 grid-cols-3">
            <p>Choose Quotation Number</p>
            <div className="col-span-2">
              {isLoading ? (
                <p>Loading</p>
              ) : (
                <AutoCompleteBox
                  list={mop}
                  selected={whichMOP}
                  query={mopQuery}
                  setQuery={setmopQuery}
                  setSelected={setWhichMOP}
                />
              )}
            </div>
          </div>
          <Neuromorphism whichNeuro={1}>
            <div className="p-5 grid-cols-4 gap-5 items-center grid">
              <p>Quotation Number</p>
              <div className="col-span-2 min-h-max border-2 border-sec px-3 py-1.5 rounded-xl">
                {whichMOP ? `${whichMOP.name}` : ""}
              </div>
              <div className="row-span-5 border-2 w-max p-5 mx-auto shadow-xl rounded-3xl text-center border-gray-800">
                <p>Sales Code</p>
                <h1 className="text-sec text-5xl">{session.user.user_code}</h1>
              </div>
              <p>Customer Name</p>
              <div className="col-span-2 min-h-max border-2 border-sec px-3 py-1.5 rounded-xl">
                {whichMOP && whichMOP.customer
                  ? `${whichMOP.customer.customer_name}`
                  : "undefined"}
              </div>
              <p>Customer Code</p>
              <div className="col-span-2 min-h-max border-2 border-sec px-3 py-1.5 rounded-xl">
                {whichMOP && whichMOP.customer
                  ? `${whichMOP.customer.customer_code}`
                  : "undefined"}
              </div>
              <p>Vertical Market</p>
              <div className="col-span-2 min-h-max border-2 border-sec px-3 py-1.5 rounded-xl">
                {whichMOP &&
                whichMOP.customer &&
                whichMOP.customer.VerticalMarket
                  ? `${whichMOP.customer.VerticalMarket.verticalMarket_name}`
                  : "undefined"}
              </div>
              <p>Group</p>
              <div className="col-span-2 min-h-max border-2 border-sec px-3 py-1.5 rounded-xl">
                {whichGroup ? `${whichGroup.group_name}` : "undefined"}
              </div>
            </div>
          </Neuromorphism>
          <div className="flex flex-row gap-10 items-center">
            <Neuromorphism whichNeuro={1}>
              <div className="p-5 grid-cols-4 mx-auto gap-5 items-center grid">
                <p>Nama PIC</p>
                <div className="min-h-max col-span-3 border-2 border-sec px-3 py-1.5 rounded-xl">
                  {whichMOP && whichMOP.customer && whichMOP.customer.PIC
                    ? `${whichMOP.customer.PIC[0].pic_name}`
                    : "undefined"}
                </div>
                <p>Posisi</p>
                <div className="min-h-max col-span-3 border-2 border-sec px-3 py-1.5 rounded-xl">
                  {whichMOP && whichMOP.customer && whichMOP.customer.PIC
                    ? `${whichMOP.customer.PIC[0].pic_position}`
                    : "undefined"}
                </div>
                <p>Email</p>
                <div className="min-h-max  col-span-3 border-2 border-sec px-3 py-1.5 rounded-xl">
                  {whichMOP && whichMOP.customer && whichMOP.customer.PIC
                    ? `${whichMOP.customer.PIC[0].pic_email}`
                    : "undefined"}
                </div>
                <p>Phone</p>
                <div className="min-h-max col-span-3 border-2 border-sec px-3 py-1.5 rounded-xl">
                  {whichMOP && whichMOP.customer && whichMOP.customer.PIC
                    ? `${whichMOP.customer.PIC[0].pic_phone}`
                    : "undefined"}
                </div>
              </div>
            </Neuromorphism>
            <Neuromorphism whichNeuro={1}>
              <div className="p-5 grid grid-cols-4 gap-5 mx-auto">
                <p>Alamat Customer</p>
                <div className="col-span-3 min-h-max border-2 border-sec px-3 py-1.5 rounded-xl">
                  {whichMOP && whichMOP.customer
                    ? `${whichMOP.customer.customer_address}`
                    : "undefined"}
                </div>
                <p>Kota</p>
                <div className="col-span-3 min-h-max border-2 border-sec px-3 py-1.5 rounded-xl">
                  {whichMOP && whichMOP.customer
                    ? `${whichMOP.customer.customer_city}`
                    : "undefined"}
                </div>
                <p>Provinsi</p>
                <div className="col-span-3 min-h-max border-2 border-sec px-3 py-1.5 rounded-xl">
                  {whichMOP && whichMOP.customer
                    ? `${whichMOP.customer.customer_province}`
                    : "undefined"}
                </div>
                <p>Kode Pos</p>
                <div className="col-span-3 min-h-max border-2 border-sec px-3 py-1.5 rounded-xl">
                  {whichMOP && whichMOP.customer
                    ? `${whichMOP.customer.customer_postalCode}`
                    : "undefined"}
                </div>
                <p>Telp. Customer</p>

                <div className="col-span-3 min-h-max border-2 border-sec px-3 py-1.5 rounded-xl">
                  {whichMOP && whichMOP.customer
                    ? `${whichMOP.customer.customer_phone}`
                    : "undefined"}
                </div>
              </div>
            </Neuromorphism>
          </div>
          <Neuromorphism whichNeuro={1}>
            <div className="p-5 grid grid-cols-2 w-1/2 mx-auto gap-5">
              <p>Quotation Value (Rp)</p>
              <div className="col-span-3 min-h-max border-2 border-sec px-3 py-1.5 rounded-xl">
                {whichMOP ? `${whichMOP.M_value}` : ""}
              </div>
              <p>MOP Value</p>
              <div className="">
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
            </div>
          </Neuromorphism>
          <div className="w-full mt-5 ">
            <div className="w-1/3 mx-auto">
              <button className="w-full">
                <Button btn="Add Quotation" />
              </button>
            </div>
          </div>
        </section>
      </form>
    </Layout>
  );
};

AddMOP.auth = true;
export default AddMOP;
