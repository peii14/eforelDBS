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
    signOut({ callbackUrl: "/Login" });
  };
  const { status, data: session } = useSession();

  return (
    <div className="flex flex-row items-center justify-between">
      <div>
        <h2 className="font-thin">{title}</h2>
      </div>
      <div>
        <Neuromorphism whichNeuro={3}>
          <div className="flex flex-row justify-between">
            {status === "loading" ? (
              "Loading"
            ) : session?.user ? (
              <Menu as="div" className="relative inline-block">
                <Menu.Button className="text-secondary bg-sec py-2 px-5 rounded-full">
                  Hi, {session.user.name}
                </Menu.Button>
                <Menu.Items className="absolute flex flex-col p-3 gap-2 mt-2 right-0 w-max origin-top-right rounded-xl bg-white shadow-xl shadow-sec ">
                  <Menu.Item>
                    <DropdownLink
                      className="hover:bg-primary duration-100 hover:text-third px-3 rounded-xl py-1"
                      href="/User/Profile"
                    >
                      Profile
                    </DropdownLink>
                  </Menu.Item>

                  <Menu.Item>
                    <a
                      className="hover:bg-primary duration-100 hover:text-third px-3 rounded-xl py-1"
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
        </Neuromorphism>
      </div>
    </div>
  );
};

export default Title;
