import Layout from "@/components/Layout";
import Title from "@/components/Layout/Title";
import { PrismaClient } from "@prisma/client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { getError } from "@/utils/error";
import Neuromorphism from "@/components/Object/Neuromorphism";
import Button from "@/components/Object/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import AutoCompleteBox from "@/components/Object/AutoCompleteBox";
import { roles } from "@/utils/role";
import { area } from "@/utils/area";

interface EditUserProps {
  user: {
    user_id: number;
    user_fullname: string;
    user_email: string;
    user_area: string;
    user_code: string;
    user_role: string;
  };
}

const EditUser = ({ user }: EditUserProps) => {
  const router = useRouter();
  const [selectedRole, setRoles] = useState({ name: "Sales" });
  const [roleQuery, setRoleQuery] = useState("Sales");
  const [selectedArea, setArea] = useState({ name: "Surabaya" });
  const [areaQuery, setAreaQuery] = useState("Surabaya");
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  }: any = useForm();
  const { data: session }: any = useSession();

  useEffect(() => {
    setValue("user_name", user.user_fullname);
    setValue("user_email", user.user_email);
    setArea({ name: user.user_area });
    setValue("user_code", user.user_code);
    setRoles({ name: user.user_role });
  }, []);

  const submitHandler = async ({
    user_name,
    user_email,
    user_code,
    user_password,
  }) => {
    try {
      await toast.promise(
        axios.put("/api/admin/user", {
          user_name,
          user_email,
          user_area: selectedArea.name,
          user_code,
          user_role: selectedRole.name,
          user_password,
        }),
        {
          pending: "Editing user",
          success: "Customer added",
        }
      );
      router.push("/admin/settings");
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Layout session={session} title="Edit User">
      <Title title="Edit User" />
      <section className="w-2/3 mx-auto">
        <Neuromorphism whichNeuro={1}>
          <form
            className="grid grid-cols-3 gap-3 p-5"
            onSubmit={handleSubmit(submitHandler)}
          >
            <p>Nama User</p>
            <div className="col-span-2 grid">
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
            <div className="col-span-2">
              <AutoCompleteBox
                list={area}
                setQuery={setAreaQuery}
                query={areaQuery}
                selected={selectedArea}
                setSelected={setArea}
              />
            </div>
            {/* <div className="col-span-2 grid">
              <input
                {...register("user_area", {
                  required: "Please enter area",
                })}
                className="px-2 w-full"
              />
              {errors.user_area && (
                <div className="text-red-500">{errors.user_area.message}</div>
              )}
            </div> */}
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
            <AutoCompleteBox
              list={roles}
              setSelected={setRoles}
              selected={selectedRole}
              setQuery={setRoleQuery}
              query={roleQuery}
            />
            {/* <div className="col-span-2 grid">
              <input
                {...register("user_role", {
                  required: "Please enter role",
                })}
                className="px-2 w-full"
              />
              {errors.user_password && (
                <div className="text-red-500">
                  {errors.user_password.message}
                </div>
              )}
            </div> */}
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
  prisma.$connect();
  const users = await prisma.user.findMany({
    select: {
      user_code: true,
    },
  });
  const categories = users.map((post) => ({
    params: { slug: post.user_code },
  }));
  prisma.$disconnect();

  return {
    paths: categories,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  let query: string = context.params.slug;
  const prisma = new PrismaClient();
  prisma.$connect();
  const users = await prisma.user.findUnique({
    where: {
      user_code: query,
    },
  });
  prisma.$connect();

  return {
    props: {
      user: {
        user_id: users.user_id,
        user_fullname: users.user_fullname,
        user_email: users.user_email,
        user_area: users.user_area,
        user_code: users.user_code,
        user_role: users.user_role,
      },
    },
    revalidate: 10,
  };
}

export default EditUser;
