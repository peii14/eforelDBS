import Layout from "@/components/Layout";
import Title from "@/components/Layout/Title";
import AutoCompleteBox from "@/components/Object/AutoCompleteBox";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { renameKey } from "@/utils/renameKey";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Neuromorphism from "@/components/Object/Neuromorphism";
import { toast } from "react-toastify";
import { getError } from "@/utils/error";
import Button from "@/components/Object/Button";
import { Store } from "@/utils/Store";
import Products from "@/components/Object/Products";
import { generateQuotationCounter } from "@/utils/activityCounter";

const AddQuotation = () => {
  const { state, dispatch }: any = useContext(Store);
  const { cart } = state;
  let [customer_name, setCustomerNames]: any = useState([{}]);
  let [pic_name, setPICNames]: any = useState([{}]);
  const [whichCustomer, setCustomer] = useState(customer_name[0]);
  const [whichPIC, setPIC] = useState(pic_name[0]);
  const [value, setValue] = useState(0);
  const { data: session }: any = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  }: any = useForm();
  const [nameQuery, setNameQuery] = useState("'-'");
  const [picQuery, setPicQuery] = useState("'-'");
  const [quotationNumber, setQuotationNumber] = useState("-");
  const [counter, setCounter] = useState("Loading...");

  useEffect(() => {
    try {
      if (nameQuery.length >= 3) {
        setIsLoading(true);
        const getCustomerName = async () => {
          const { data } = await axios.get("/api/customer", {
            params: { q: nameQuery, salesCode: session.user.user_code },
          });
          data.forEach((obj) => renameKey(obj, "customer_name", "name"));
          setCustomerNames(data);
        };
        getCustomerName();
        setIsLoading(false);
      } else setNameQuery("-");
    } catch (err) {
      toast.error(err);
    }
  }, [nameQuery]);

  useEffect(() => {
    try {
      if (picQuery.length >= 3) {
        const getPIC = async () => {
          const { data } = await axios.get("/api/pic", {
            params: { q: picQuery },
          });
          data.forEach((obj) => renameKey(obj, "pic_name", "name"));
          setPICNames(data);
        };
        getPIC();
      } else setPicQuery("-");
    } catch (err) {
      toast.error(err);
    }
  }, [picQuery]);

  useEffect(() => {
    generateQuotationCounter(session.user.user_code).then((value) => {
      setCounter(value.toString());
    });

    const area = { Surabaya: "SQ", Bandung: "BQ", Jakarta: "JQ" };
    const d = new Date();
    let day = d.getUTCDate();
    let month = d.getUTCMonth();
    let year = d.getUTCFullYear();
    let dates =
      year.toString().slice(-2) +
      (month < 10 ? "0" + (month + 1).toString() : "asd") +
      day.toString();

    let _quotationNumber = whichCustomer.customer_code
      ? [
          area[session.user.user_area],
          dates.toString(),
          counter,
          session.user.user_code,
          whichCustomer.customer_code,
        ].join("-")
      : "-";

    setQuotationNumber(_quotationNumber);
  }, [pic_name, customer_name]);

  const addProductsHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.name === product.name);
    const quantity = existItem
      ? existItem.quantity + 1
      : Number(getValues("quotation_qty"));

    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
  };

  const submitHandler = async ({ vertical_market, group }) => {
    try {
      await axios.post("/api/quotation", {
        quotation_num: quotationNumber,
        quotation_value: parseFloat(
          getValues("quotation_value").replace(/,/g, "")
        ),
        quotation_product: JSON.stringify(cart),
        quotation_customerID: whichCustomer.customer_id,
        quotation_PIC_ID: whichPIC.pic_id,
      });
    } catch (err) {
      toast.error(getError(err));
    }
    toast.success("Quotation added");
  };
  const addCommas = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

  const handleComma = (event) =>
    setValue(addCommas(removeNonNumeric(event.target.value)));

  return (
    <Layout session={session} title="Add Quotation">
      <Title title="Add Quotation" />
      <form onSubmit={handleSubmit(submitHandler)}>
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
            <p>Quotation Number</p>

            <p className="font-semibold">{quotationNumber}</p>
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
                {whichCustomer ? `${whichCustomer.customer_code}` : ""}
              </div>
              <p>Area</p>
              <div className="col-span-2 min-h-max border-2 border-sec px-3 py-1.5 rounded-xl">
                {whichCustomer ? `${whichCustomer.customer_city}` : ""}
              </div>
              <p>Vertical Market</p>
              <div className="col-span-2 min-h-max border-2 border-sec px-3 py-1.5 rounded-xl">
                {whichCustomer && whichCustomer.VerticalMarket
                  ? `${whichCustomer.VerticalMarket.verticalMarket_name}`
                  : "undefined"}
              </div>
              <p>Group</p>
              <div className="col-span-2 min-h-max border-2 border-sec px-3 py-1.5 rounded-xl">
                {whichCustomer && whichCustomer.VerticalMarket
                  ? `${whichCustomer.VerticalMarket.Group[0].group_name}`
                  : "undefined"}
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
                  {whichPIC ? `${whichPIC.pic_position}` : ""}
                </div>
                <p>Email</p>
                <div className="min-h-max  col-span-3 border-2 border-sec px-3 py-1.5 rounded-xl">
                  {whichPIC ? `${whichPIC.pic_email}` : ""}
                </div>
                <p>Phone</p>
                <div className="min-h-max col-span-3 border-2 border-sec px-3 py-1.5 rounded-xl">
                  {whichPIC ? `${whichPIC.pic_phone}` : ""}
                </div>
              </div>
            </Neuromorphism>
            <Neuromorphism whichNeuro={1}>
              <div className="p-5 grid grid-cols-4 gap-5 mx-auto">
                <p>Alamat Customer</p>
                <div className="col-span-3 min-h-max border-2 border-sec px-3 py-1.5 rounded-xl">
                  {whichCustomer ? `${whichCustomer.customer_address}` : ""}
                </div>
                <p>Kota</p>
                <div className="col-span-3 min-h-max border-2 border-sec px-3 py-1.5 rounded-xl">
                  {whichCustomer ? `${whichCustomer.customer_city}` : ""}
                </div>
                <p>Provinsi</p>
                <div className="col-span-3 min-h-max border-2 border-sec px-3 py-1.5 rounded-xl">
                  {whichCustomer ? `${whichCustomer.customer_province}` : ""}
                </div>
                <p>Kode Pos</p>
                <div className="col-span-3 min-h-max border-2 border-sec px-3 py-1.5 rounded-xl">
                  {whichCustomer ? `${whichCustomer.customer_postalCode}` : ""}
                </div>
                <p>Telp. Customer</p>
                <div className="col-span-3 min-h-max border-2 border-sec px-3 py-1.5 rounded-xl">
                  {whichCustomer ? `${whichCustomer.customer_phone}` : ""}
                </div>
              </div>
            </Neuromorphism>
          </div>
          <Neuromorphism whichNeuro={1}>
            <div className="p-5 grid grid-cols-5 gap-5">
              <p>Quotation Value (Rp)</p>
              <div className="col-span-4">
                <input
                  {...register("quotation_value", {
                    required: "Please enter Quotation Value",
                  })}
                  className="px-2 w-full"
                  onChange={handleComma}
                  value={value}
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
                  {...register("quotation_products", {})}
                  className="px-2 w-full"
                />
                {errors.quotation_value && (
                  <div className="text-red-500">
                    {errors.group.quotation_value}
                  </div>
                )}
              </div>
              <div className="col-span-1 flex flex-row">
                <p>Qty</p>
                <div>
                  <input
                    {...register("quotation_qty", {})}
                    className="px-2 w-2/3 mx-4"
                    type="number"
                  />
                  {errors.quotation_value && (
                    <div className="text-red-500">
                      {errors.group.quotation_value}
                    </div>
                  )}
                </div>
              </div>
              <div
                onClick={() =>
                  addProductsHandler({ name: getValues("quotation_products") })
                }
              >
                <Button btn="Add product" />
              </div>
              <Products state={state} dispatch={dispatch} />
            </div>
          </Neuromorphism>
          <div className="w-full mt-5">
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

AddQuotation.auth = true;
export default AddQuotation;
