import Neuromorphism from "../Object/Neuromorphism";
import DropdownLink from "@/components/Object/DropdownLink";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import Button from "../Object/Button";
import React from "react";
import { signOut, useSession } from "next-auth/react";

interface TitleProps {
  readonly title?: string;
}

const Title = ({ title = "-" }) => {
  const logoutClickHandler = () => {
    signOut({ callbackUrl: "/" });
  };
  const { status, data: session } = useSession();

  return (
    <div className="flex flex-row items-center mb-5 justify-between">
      <div>
        <h2 className="font-thin">{title}</h2>
      </div>
      <div>
        <div className="flex flex-row justify-between">
          {status === "loading" ? (
            "Loading"
          ) : session?.user ? (
            <Menu as="div" className="relative inline-block">
              <Menu.Button className="text-secondary bg-sec py-2 px-5 rounded-full">
                Hi, {session.user.name}
              </Menu.Button>
              <Menu.Items className="absolute flex flex-col p-3 gap-2 mt-2 right-0 w-max origin-top-right rounded-xl bg-white shadow-lg ">
                <Menu.Item>
                  <DropdownLink
                    className="hover:bg-sec duration-100  px-3 rounded-xl py-1"
                    href="/User/Profile"
                  >
                    Profile
                  </DropdownLink>
                </Menu.Item>

                <Menu.Item>
                  <a
                    className="hover:bg-sec duration-10 px-3 rounded-xl py-1"
                    href="#"
                    onClick={logoutClickHandler}
                  >
                    Logout
                  </a>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <Link href="/Login">
              <a className="p-2">
                <Button btn={"Sign In"} />
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Title;
