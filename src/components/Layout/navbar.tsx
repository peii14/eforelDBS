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
import React from "react";

const Navbar = () => {
  const { asPath } = useRouter();

  return (
    <div className=" w-36 h-screen fixed top-1/2 -translate-y-1/2 z-20 shadow-lg bg-background  shadow-slate-700 p-5 px-2 rounded-xl ">
      <ul className="flex text-center flex-col justify-center align-middle h-screen gap-2">
        <li
          className={`${
            asPath === "/eforel" ? "bg-primary text-white" : ""
          } cursor-pointer hover:bg-primary hover:text-white duration-300 px-3 py-2 rounded-xl`}
        >
          <Link href={"/eforel/"}>
            <a className="flex flex-col gap-1 items-center">
              <FaHome size={20} />
              <p className="basis-2/3 text-sm">Dashboard</p>
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
              <p className="basis-2/3 text-sm">Add Customer</p>
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
              <p className="basis-2/3 text-sm">Add PIC</p>
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
              <p className="basis-2/3 text-sm">Add Vertikal Market & Group</p>
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
              <p className="basis-2/3 text-sm">Add Quotation</p>
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
              <p className="basis-2/3 text-sm">Add MOP</p>
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
              <p className="basis-2/3 text-sm">Sales Activity</p>
            </a>
          </Link>
        </li>
        <li
          className={`${
            asPath === "/admin/settings" ? "bg-primary text-white" : ""
          } cursor-pointer hover:bg-primary hover:text-white duration-300 px-3 py-2 rounded-xl`}
        >
          <Link href={"/admin/settings"}>
            <a className="flex py-2 flex-col gap-1 items-center">
              <AiOutlineSetting size={20} />
              <p className="basis-2/3 text-sm">Settings</p>
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Navbar;
