import Link from "next/link";
import { FaHome, FaPeopleArrows, FaRegBuilding } from "react-icons/fa";
import {
  AiOutlineUsergroupAdd,
  AiOutlineSchedule,
  AiOutlineSetting,
} from "react-icons/ai";
import { MdOutlineRequestQuote } from "react-icons/md";
import { HiDocumentAdd } from "react-icons/hi";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Neuromorphism from "../Object/Neuromorphism";
import AnimateHeight from "react-animate-height";

interface NavbarProps {
  readonly role: number;
  readonly isOpen: boolean;
  readonly height: number;
}

const Navbar = ({ role, isOpen, height }: NavbarProps) => {
  const { asPath } = useRouter();
  return (
    <nav
      className={`${
        isOpen ? "w-44 h-5/6" : "w-24 h-3/4"
      } duration-300 fixed top-1/2 -translate-y-1/2 z-50`}
    >
      <Neuromorphism whichNeuro={1}>
        <ul
          className={`flex text-center flex-col h-full justify-center align-middle gap-2`}
        >
          <li
            className={`${
              asPath === "/eforel" ? "bg-primary text-white" : ""
            } cursor-pointer hover:bg-primary hover:text-white duration-300 px-3 py-2 rounded-xl`}
          >
            <Link href={"/eforel/"}>
              <a className="flex flex-col gap-1 items-center">
                <FaHome size={20} />
                <AnimateHeight duration={300} height={height}>
                  <p className={`basis-2/3 text-sm `}>Dashboard</p>
                </AnimateHeight>
              </a>
            </Link>
          </li>
          <li
            className={`${
              asPath === "/eforel/add-customer" ? "bg-primary text-white" : ""
            } cursor-pointer hover:bg-primary hover:text-white duration-300 px-3 py-2 rounded-xl`}
          >
            <Link href={"/eforel/add-customer"}>
              <a className="flex flex-col gap-1 items-center">
                <FaPeopleArrows size={20} />
                <AnimateHeight duration={300} height={height}>
                  <p className={`basis-2/3 text-sm `}>Add Customer</p>
                </AnimateHeight>
              </a>
            </Link>
          </li>
          <li
            className={`${
              asPath === "/eforel/add-pic" ? "bg-primary text-white" : ""
            } cursor-pointer hover:bg-primary hover:text-white duration-300 px-3 py-2 rounded-xl`}
          >
            <Link href={"/eforel/add-pic"}>
              <a className="flex flex-col gap-1 items-center">
                <AiOutlineUsergroupAdd size={20} />
                <AnimateHeight duration={300} height={height}>
                  <p className={`basis-2/3 text-sm `}>Add PIC</p>
                </AnimateHeight>
              </a>
            </Link>
          </li>
          <li
            className={`${
              asPath === "/eforel/add-vm" ? "bg-primary text-white" : ""
            } cursor-pointer hover:bg-primary hover:text-white duration-300 px-3 py-2 rounded-xl`}
          >
            <Link href={"/eforel/add-vm"}>
              <a className="flex py-2 flex-col gap-1 items-center">
                <FaRegBuilding size={20} />
                <AnimateHeight duration={300} height={height}>
                  <p className={`basis-2/3 text-sm `}>Add VM</p>
                </AnimateHeight>
              </a>
            </Link>
          </li>
          <li
            className={`${
              asPath === "/eforel/add-quotation" ? "bg-primary text-white" : ""
            } cursor-pointer hover:bg-primary hover:text-white duration-300 px-3 py-2 rounded-xl`}
          >
            <Link href={"/eforel/add-quotation"}>
              <a className="flex py-2 flex-col gap-1 items-center">
                <MdOutlineRequestQuote size={20} />
                <AnimateHeight duration={300} height={height}>
                  <p className={`basis-2/3 text-sm `}>Add Quotation</p>
                </AnimateHeight>
              </a>
            </Link>
          </li>
          <li
            className={`${
              asPath === "/eforel/add-mop" ? "bg-primary text-white" : ""
            } cursor-pointer hover:bg-primary hover:text-white duration-300 px-3 py-2 rounded-xl`}
          >
            <Link href={"/eforel/add-mop"}>
              <a className="flex py-2 flex-col gap-1 items-center">
                <HiDocumentAdd size={20} />
                <AnimateHeight duration={300} height={height}>
                  <p className={`basis-2/3 text-sm `}>Add MOP</p>
                </AnimateHeight>
              </a>
            </Link>
          </li>
          <li
            className={`${
              asPath.includes("/eforel/sales-activity")
                ? "bg-primary text-white"
                : ""
            } cursor-pointer hover:bg-primary hover:text-white duration-300 px-3 py-2 rounded-xl`}
          >
            <Link href={"/eforel/sales-activity"}>
              <a className="flex py-2 flex-col gap-1 items-center">
                <AiOutlineSchedule size={20} />
                <AnimateHeight duration={300} height={height}>
                  <p className={`basis-2/3 text-sm `}>Sales Activity</p>
                </AnimateHeight>
              </a>
            </Link>
          </li>
          {(role === 1 || role === 2) && (
            <li
              className={`${
                asPath === "/admin/settings" ? "bg-primary text-white" : ""
              } cursor-pointer hover:bg-primary hover:text-white duration-300 px-3 py-2 rounded-xl`}
            >
              <Link href={"/admin/settings"}>
                <a className="flex py-2 flex-col gap-1 items-center">
                  <AiOutlineSetting size={20} />
                  <AnimateHeight duration={300} height={height}>
                    <p className={` basis-2/3 text-sm `}>Settings</p>
                  </AnimateHeight>
                </a>
              </Link>
            </li>
          )}
        </ul>
      </Neuromorphism>
    </nav>
  );
};
export default Navbar;
