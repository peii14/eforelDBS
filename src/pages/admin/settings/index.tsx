import Layout from "@/components/Layout";
import Title from "@/components/Layout/Title";
import Neuromorphism from "@/components/Object/Neuromorphism";
import { BsFillPeopleFill } from "react-icons/bs";
import { AiFillProfile } from "react-icons/ai";
import { PrismaClient } from "@prisma/client";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@/components/Object/Button";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const settings = ({ user }) => {
  const router = useRouter();
  const json = JSON.parse(user);
  const [users, setUsers] = useState(json);

  const { data: session }: any = useSession();

  const addHandler = async () => {
    try {
      const addUser = await toast.promise(axios.post("/api/admin/user"), {
        pending: "Creating user",
        success: "New user has been created",
        error: "Please change default user",
      });
      router.push(`/admin/settings/edit-user/${addUser.data.user_code}`);
    } catch (error) {
      toast.error(error);
    }
  };
  const editHandler = async () => {
    try {
    } catch (error) {
      toast.error(error);
    }
  };

  const deleteHandler = async (userID: Number) => {
    try {
      const del = await toast.promise(
        axios.delete("/api/admin/user", { params: { id: userID } }),
        {
          pending: "Deleting user",
          success: "User has been deleted",
        }
      );
    } catch (error) {
      return toast.error(error);
    }
  };
  return (
    <Layout session={session} title="Settings">
      <Title title="Settings" />
      <section className="flex flex-row justify-around py-5">
        <div onClick={() => addHandler()} className="basis-1/4">
          <Neuromorphism whichNeuro={2}>
            <div className="flex flex-col items-center gap-5">
              <BsFillPeopleFill className="text-5xl" />
              <h3 className="font-thin text-center">Add User</h3>
            </div>
          </Neuromorphism>
        </div>
      </section>
      <section className="mt-5">
        <Neuromorphism whichNeuro={1}>
          <div className=" py-10 max-h-screen overflow-y-auto">
            <table className="min-w-full  ">
              <thead className="border-y-2 border-sec sticky">
                <tr>
                  <th className="px-5 text-left">Full Name</th>
                  <th className="p-3 text-left">Code</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-left">Area</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Created</th>
                  <th className="p-3 text-left">Updated</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(users).map((user: any) => (
                  <tr
                    key={user.user_code}
                    className="border-b-2 border-sec border-double border-opacity-20"
                  >
                    <td className=" p-3 ">{user.user_fullname}</td>
                    <td className=" p-3 ">{user.user_code}</td>
                    <td className=" p-3 ">{user.user_role}</td>
                    <td className=" p-3 ">{user.user_area}</td>
                    <td className=" p-3 ">{user.user_email}</td>
                    <td className=" p-3 ">{user.user_created}</td>
                    <td className=" p-3 ">{user.user_updated}</td>
                    <td className=" p-5 flex flex-row ">
                      <Link
                        href={`/admin/settings/edit-user/${user.user_code}`}
                      >
                        <a>
                          <Button btn="Edit" />
                        </a>
                      </Link>
                      <button
                        onClick={() => deleteHandler(user.user_id)}
                        className="default-button"
                        type="button"
                      >
                        <div className="ml-3 border-2 duration-300 hover:bg-primary-400 border-primary rounded-full px-3 py-1">
                          Delete
                        </div>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Neuromorphism>
      </section>
    </Layout>
  );
};

export async function getStaticProps(context) {
  const prisma = new PrismaClient();
  const user = await prisma.user.findMany({});
  return {
    props: {
      user: JSON.stringify(Object.values(user)),
    },
  };
}
settings.auth = true;
export default settings;
