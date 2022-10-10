import Link from "next/link";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { getError } from "@/utils/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Neuromorphism from "@/components/Object/Neuromorphism";
import Layout from "@/components/Layout";
import Button from "@/components/Object/Button";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default function LoginScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect }: any = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  }: any = useForm();
  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Layout title={"Login"}>
      <div className="flex h-screen -mt-16 w-screen">
        <div className="m-auto w-1/3">
          <Neuromorphism whichNeuro={1}>
            <form
              className="mx-auto max-w-screen-md p-5 text-primary"
              onSubmit={handleSubmit(submitHandler)}
            >
              <h1 className="mb-4 font-semibold text-4xl text-center">Login</h1>
              <div className="mb-4">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Please enter email",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                      message: "Please enter valid email",
                    },
                  })}
                  className={`w-full px-1 py-0.5 text-black ${
                    errors.email ? "ring-1 ring-red-600" : ""
                  }`}
                  id="email"
                  autoFocus
                ></input>
                {errors.email && (
                  <div className="text-red-600 font-bold  p-1 w-max">
                    <p className="text-sm">{errors.email.message}</p>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Please enter password",
                    minLength: {
                      value: 6,
                      message: "password is more than 5 chars",
                    },
                  })}
                  className={`w-full px-1 py-0.5 text-black ${
                    errors.password ? "ring-1 ring-red-600" : ""
                  }`}
                  id="password"
                  autoFocus
                ></input>
                {errors.password && (
                  <div className=" text-red-600 font-bold  p-1 w-max ">
                    <p className="text-sm">{errors.password.message}</p>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <Link href={`/ForgotPassword?redirect=${redirect || "/"}`}>
                  <p className="font-light text-sm cursor-pointer">
                    Forgot Password
                  </p>
                </Link>
              </div>
              <div className="mb-4 ">
                <button className="primary-button">
                  <Button btn={"Login"} />
                </button>
              </div>
              <div className="mb-4 ">
                <p>Don&apos;t have an account? &nbsp;</p>
                <Link href={`/Register?redirect=${redirect || "/"}`}>
                  <p className="font-bold cursor-pointer w-max">Register</p>
                </Link>
              </div>
            </form>
          </Neuromorphism>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session: any = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  return {
    props: {
      session: session,
    },
  };
}
