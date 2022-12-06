import Layout from "@/components/Layout";
import Title from "@/components/Layout/Title";
import Neuromorphism from "@/components/Object/Neuromorphism";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoMapSharp } from "react-icons/io5";
import { AiFillProfile } from "react-icons/ai";
import { PrismaClient } from "@prisma/client";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@/components/Object/Button";
import { toast } from "react-toastify";
const settings = ({ user }) => {
  const json = JSON.parse(user);
  const [users, setUsers] = useState(json);
  useEffect(() => {
    console.log(users);
  }, []);

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
    <Layout title="Settings">
      <Title title="Settings" />
      <section className="flex flex-row justify-around py-5">
        <div className="basis-1/4">
          <Neuromorphism whichNeuro={2}>
            <div className="flex flex-col items-center gap-5">
              <BsFillPeopleFill className="text-5xl" />
              <h3 className="font-thin text-center">Add User</h3>
            </div>
          </Neuromorphism>
        </div>

        <div className="basis-1/4">
          <Neuromorphism whichNeuro={2}>
            <div className="flex flex-col items-center gap-5">
              <AiFillProfile className="text-5xl" />
              <h3 className="font-thin text-center">Company Profile</h3>
            </div>
          </Neuromorphism>
        </div>
      </section>
      <section className="mt-5">
        <Neuromorphism whichNeuro={1}>
          <div className="px-3 py-10 max-h-screen overflow-y-auto">
            <table className="min-w-full  ">
              <thead className="border-y-2 border-sec sticky">
                <tr>
                  <th className="px-5 text-left">Full Name</th>
                  <th className="p-5 text-left">Code</th>
                  <th className="p-5 text-left">Role</th>
                  <th className="p-5 text-left">Area</th>
                  <th className="p-5 text-left">Email</th>
                  <th className="p-5 text-left">Created</th>
                  <th className="p-5 text-left">Updated</th>
                  <th className="p-5 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(users).map((user: any) => (
                  <tr
                    key={user.user_id}
                    className="border-b-2 border-sec border-double border-opacity-20"
                  >
                    <td className=" p-5 ">{user.user_fullname}</td>
                    <td className=" p-5 ">{user.user_code}</td>
                    <td className=" p-5 ">{user.user_role}</td>
                    <td className=" p-5 ">{user.user_area}</td>
                    <td className=" p-5 ">{user.user_email}</td>
                    <td className=" p-5 ">{user.user_created}</td>
                    <td className=" p-5 ">{user.user_updated}</td>

                    <td className=" p-5 ">
                      <button
                        onClick={() => deleteHandler(user.user_id)}
                        className="default-button"
                        type="button"
                      >
                        <Button btn="Delete" />
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
    revalidate: 10,
  };
}

export default settings;
