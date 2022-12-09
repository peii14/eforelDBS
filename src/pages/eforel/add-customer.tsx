import Layout from "@/components/Layout";
import Title from "@/components/Layout/Title";
import Neuromorphism from "@/components/Object/Neuromorphism";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "@/utils/error";
import Button from "@/components/Object/Button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import RadioGroups from "@/components/Object/RadioGroups";
import { renameKey } from "@/utils/renameKey";
import { PrismaClient } from "@prisma/client";

interface AddCustomerProps {
  vertical_marketJSON?: string;
}

const AddCustomer = ({ vertical_marketJSON }: AddCustomerProps) => {
  const area = [{ name: "Surabaya" }, { name: "Bandung" }, { name: "Jakarta" }];
  const [whichArea, setWhichArea] = useState(area[0]);
  const vertical_market = JSON.parse(vertical_marketJSON);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [whichVerticalMarket, setWhichVerticalMarket]: any = useState({});
  const { data: session }: any = useSession();
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  }: any = useForm();

  const submitHandler = async ({
    cust_name,
    cust_code,
    address,
    city,
    province,
    postal_code,
    cust_phone,
  }) => {
    try {
      const salesCode = session.user.user_code;
      const vm_id = vertical_market.find(
        ({ name }) => name === whichVerticalMarket
      );
      await toast.promise(
        axios.post("/api/customer", {
          customer_name: cust_name,
          customer_code: cust_code,
          customer_salesCode: salesCode,
          customer_verticalMarketID: vm_id.verticalMarket_id,
          customer_address: address,
          customer_province: province,
          customer_city: city,
          customer_postalCode: postal_code,
          customer_phone: cust_phone,
          customer_groupID: selectedGroup,
        }),
        {
          pending: "Adding new customer",
          success: "Customer added",
        }
      );
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Add Customer">
      <Title title="Add New Customer" />
      <form className="w-full" onSubmit={handleSubmit(submitHandler)}>
        <div className="grid grid-cols-3 gap-10">
          <div className="col-span-2">
            <Neuromorphism whichNeuro={1}>
              <div className="p-5 grid grid-cols-3 gap-5">
                <p>Nama Customer</p>
                <div className="col-span-2">
                  <input
                    {...register("cust_name", {
                      required: "Please enter name",
                    })}
                    className="px-2 w-full"
                  />
                  {errors.name && (
                    <div className="text-red-500">{errors.name.message}</div>
                  )}
                </div>
                <p>Kode Customer</p>
                <div className="col-span-2">
                  <input
                    className="px-2 w-full"
                    {...register("cust_code", {
                      required: "Please enter customer code",
                    })}
                  />
                  {errors.name && (
                    <div className="text-red-500">
                      {errors.customerCode.message}
                    </div>
                  )}
                </div>
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
          <Neuromorphism whichNeuro={1}>
            <div>
              <p className="text-xl">Area: </p>
              <RadioGroups
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
                title="area"
                plans={area}
                selected={whichArea}
                setSelected={setWhichArea}
              />
            </div>
          </Neuromorphism>
          <div className="col-span-2">
            <Neuromorphism whichNeuro={1}>
              <div className="">
                <p className="text-xl">Verical Market:</p>
                <RadioGroups
                  selectedGroup={selectedGroup}
                  setSelectedGroup={setSelectedGroup}
                  title="vertical market"
                  plans={vertical_market}
                  selected={whichVerticalMarket}
                  setSelected={setWhichVerticalMarket}
                  columns={3}
                />
              </div>
            </Neuromorphism>
          </div>
          <div className="col-span-3 w-3/5 mx-auto">
            <Neuromorphism whichNeuro={1}>
              <div className="grid grid-cols-4 p-5 gap-5">
                <div className="flex flex-row col-span-4 gap-10">
                  <p>Alamat</p>
                  <div className="w-full">
                    <input
                      {...register("address", {
                        required: "Please enter address",
                      })}
                      className="px-2 w-full "
                    />
                    {errors.address && (
                      <div className="text-red-500">
                        {errors.address.message}
                      </div>
                    )}
                  </div>
                </div>
                <p>Kota</p>
                <div className="">
                  <input
                    {...register("city", {
                      required: "Please enter city",
                    })}
                    className="px-2 w-full"
                  />
                  {errors.city && (
                    <div className="text-red-500">{errors.city.message}</div>
                  )}
                </div>

                <p>Provinsi</p>
                <div className="">
                  <input
                    {...register("province", {
                      required: "Please enter province",
                    })}
                    className="px-2 w-full"
                  />
                  {errors.province && (
                    <div className="text-red-500">
                      {errors.province.message}
                    </div>
                  )}
                </div>
                <p>Kode Pos</p>
                <div className="">
                  <input
                    {...register("postal_code", {
                      required: "Please enter zip code",
                    })}
                    className="px-2 w-full"
                  />
                  {errors.posCode && (
                    <div className="text-red-500">{errors.posCode.message}</div>
                  )}
                </div>
                <p>Telepon</p>
                <div className="">
                  <input
                    {...register("cust_phone", {
                      required: "Please enter telephone number",
                    })}
                    className="px-2 w-full "
                  />
                  {errors.telphoneNumber && (
                    <div className="text-red-500">
                      {errors.telphoneNumber.message}
                    </div>
                  )}
                </div>
              </div>
            </Neuromorphism>
          </div>
        </div>
        <div className="w-full mt-5 ">
          <div className="w-1/3 mx-auto">
            <button className="w-full">
              <Button btn="Add Customer" />
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const prisma = new PrismaClient();

  const vertical_market = await prisma.verticalMarket.findMany({
    include: {
      Group: {
        select: {
          group_name: true,
          group_id: true,
        },
      },
    },
  });

  vertical_market.forEach((obj) =>
    renameKey(obj, "verticalMarket_name", "name")
  );

  return {
    props: {
      vertical_marketJSON: JSON.stringify(vertical_market),
    },
  };
}

AddCustomer.auth = true;
export default AddCustomer;
