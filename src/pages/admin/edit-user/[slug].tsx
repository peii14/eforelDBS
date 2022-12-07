import Layout from "@/components/Layout";
import Title from "@/components/Layout/Title";
import { PrismaClient } from "@prisma/client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { getError } from "@/utils/error";
import Neuromorphism from "@/components/Object/Neuromorphism";
import Button from "@/components/Object/Button";

interface EditUserProps {
  user: {
    user_id: number;
    user_fullname: string;
    user_email: string;
    user_area: string;
    user_code: string;
  };
}

const EditUser = ({ user }: EditUserProps) => {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  }: any = useForm();

  const submitHandler = async ({ user_name }) => {
    try {
      await toast.promise(axios.post("/api/customer", { user_name }), {
        pending: "Adding new customer",
        success: "Customer added",
      });
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="Edit User">
      <Title title="Edit User" />
      <section className="w-2/3 mx-auto">
        <Neuromorphism whichNeuro={1}>
          <form
            className="grid grid-cols-3 gap-3 p-5"
            onSubmit={handleSubmit(submitHandler)}
          >
            <p>Nama User</p>
            <div className="col-span-2 grid g">
              <input
                {...register("user_name", {
                  required: "Please enter name",
                })}
                className="px-2 w-full"
              />
              {errors.name && (
                <div className="text-red-500">{errors.name.message}</div>
              )}
            </div>
            <p>Email</p>
            <div className="col-span-2 grid">
              <input
                {...register("user_email", {
                  required: "Please enter email",
                })}
                className="px-2 w-full"
              />
              {errors.user_email && (
                <div className="text-red-500">{errors.user_email.message}</div>
              )}
            </div>
            <p>Area</p>
            <div className="col-span-2 grid">
              <input
                {...register("user_area", {
                  required: "Please enter area",
                })}
                className="px-2 w-full"
              />
              {errors.user_area && (
                <div className="text-red-500">{errors.user_area.message}</div>
              )}
            </div>
            <p>Code</p>
            <div className="col-span-2 grid">
              <input
                {...register("user_code", {
                  required: "Please enter user code",
                })}
                className="px-2 w-full"
              />
              {errors.user_code && (
                <div className="text-red-500">{errors.user_code.message}</div>
              )}
            </div>

            <p>Set Password</p>
            <div className="col-span-2 grid">
              <input
                {...register("user_password", {
                  required: "Please enter password",
                })}
                className="px-2 w-full"
              />
              {errors.user_password && (
                <div className="text-red-500">
                  {errors.user_password.message}
                </div>
              )}
            </div>
            <p>Confirm Password</p>
            <div className="col-span-2 grid">
              <input
                className={` px-2  ${
                  errors.confirmPassword ? "ring-1 ring-red-600" : ""
                } `}
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Please enter confirm password",
                  validate: (value) => value === getValues("user_password"),
                  minLength: {
                    value: 6,
                    message: "confirm password is more than 5 chars",
                  },
                })}
              />
            </div>
            <p>Role</p>
            <div className="col-span-2 grid">
              <input
                {...register("user_password", {
                  required: "Please enter role",
                })}
                className="px-2 w-full"
              />
              {errors.user_password && (
                <div className="text-red-500">
                  {errors.user_password.message}
                </div>
              )}
            </div>
            <div className="w-full justify-center mt-5 flex col-span-3">
              <button className="w-1/2">
                <Button btn="Create User" />
              </button>
            </div>
          </form>
        </Neuromorphism>
      </section>
    </Layout>
  );
};

export async function getStaticPaths() {
  const prisma = new PrismaClient();

  const users = await prisma.user.findMany({
    select: {
      user_code: true,
    },
  });
  const categories = users.map((post) => ({
    params: { slug: post.user_code },
  }));
  return {
    paths: categories,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  let query: string = context.params.slug;
  const prisma = new PrismaClient();

  const users = await prisma.user.findUnique({
    where: {
      user_code: query,
    },
  });
  console.log(users);

  return {
    props: {
      user: {
        user_id: users.user_id,
        user_fullname: users.user_fullname,
        user_email: users.user_email,
        user_area: users.user_area,
        user_code: users.user_code,
      },
    },
    revalidate: 10,
  };
}

export default EditUser;
