import Layout from "@/components/Layout";
import Title from "@/components/Layout/Title";
import Neuromorphism from "@/components/Object/Neuromorphism";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { getError } from "@/utils/error";
import axios from "axios";
import { useForm } from "react-hook-form";
import Button from "@/components/Object/Button";

const AddVM = () => {
  const { data: session }: any = useSession();
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  }: any = useForm();
  const submitHandler = async ({ vertical_market, group }) => {
    try {
      let buffer_group = "-";
      if (group) {
        buffer_group = group;
      }

      await toast.promise(
        axios.post("/api/vertical_market", {
          verticalMarket_name: vertical_market,
          group: buffer_group,
        }),
        {
          pending: "adding vertical market",
          success: "Vertical Market has been added",
        }
      );
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout session={session} title="Add Vertical Market">
      <Title title="Add Vertikal Market & Group" />
      <form onSubmit={handleSubmit(submitHandler)}>
        <section>
          <Neuromorphism whichNeuro={1}>
            <div className="p-5 grid grid-cols-3 gap-5 w-2/3 mx-auto">
              <p>Input vertical market</p>
              <div className="col-span-2">
                <input
                  {...register("vertical_market", {
                    required: "Please enter name",
                  })}
                  className="px-2 w-full"
                />
                {errors.vertical_market && (
                  <div className="text-red-500">
                    {errors.vertical_market.message}
                  </div>
                )}
              </div>
              <p>Input Group</p>
              <div className="col-span-2">
                <input {...register("group", {})} className="px-2 w-full" />
                {errors.group && (
                  <div className="text-red-500">{errors.group.message}</div>
                )}
              </div>
            </div>
          </Neuromorphism>
        </section>
        <div className="w-full mt-5 ">
          <div className="w-1/3 mx-auto">
            <button className="w-full">
              <Button btn="Add Vertical Market" />
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

AddVM.auth = true;
export default AddVM;
