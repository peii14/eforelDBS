import Link from "next/link";
import { FaHome, FaPeopleArrows, FaRegBuilding } from "react-icons/fa";
import {
  AiOutlineUsergroupAdd,
  AiOutlineSchedule,
  AiOutlineSetting,
} from "react-icons/ai";
import { MdOutlineRequestQuote } from "react-icons/md";
import { HiDocumentAdd } from "react-icons/hi";

const Navbar = () => {
  return (
    <div className=" w-36 h-screen fixed top-1/2 -translate-y-1/2 z-20 shadow-xl bg-white  shadow-slate-700 p-5 px-2 rounded-xl ">
      <ul className="flex text-center flex-col justify-center align-middle h-screen gap-2">
        <li className="cursor-pointer px-3 py-2 hover:bg-primary hover:text-white duration-300 rounded-xl">
          <Link href={"/dashboard"}>
            <a className="flex flex-col gap-1 items-center">
              <FaHome size={20} />
              <p className="basis-2/3 text-sm">Dashboard</p>
            </a>
          </Link>
        </li>
        <li className="cursor-pointer hover:bg-primary hover:text-white duration-300 px-3 py-2 rounded-xl">
          <Link href={"/addCustomer"}>
            <a className="flex flex-col gap-1 items-center">
              <FaPeopleArrows size={20} />
              <p className="basis-2/3 text-sm">Add Customer</p>
            </a>
          </Link>
        </li>
        <li className="cursor-pointer hover:bg-primary hover:text-white duration-300 px-3 py-2 rounded-xl">
          <Link href={"/addPIC"}>
            <a className="flex flex-col gap-1 items-center">
              <AiOutlineUsergroupAdd size={20} />
              <p className="basis-2/3 text-sm">Add PIC</p>
            </a>
          </Link>
        </li>
        <li className="cursor-pointer hover:bg-primary hover:text-white duration-300 px-3 py-2 rounded-xl">
          <Link href={"/addVM"}>
            <a className="flex py-2 flex-col gap-1 items-center">
              <FaRegBuilding size={20} />
              <p className="basis-2/3 text-sm">Add Vertikal Market & Group</p>
            </a>
          </Link>
        </li>
        <li className="cursor-pointer hover:bg-primary hover:text-white duration-300 px-3 py-2 rounded-xl">
          <Link href={"/addQuotation"}>
            <a className="flex py-2 flex-col gap-1 items-center">
              <MdOutlineRequestQuote size={20} />
              <p className="basis-2/3 text-sm">Add Quotation</p>
            </a>
          </Link>
        </li>
        <li className="cursor-pointer hover:bg-primary hover:text-white duration-300 px-3 py-2 rounded-xl">
          <Link href={"/addMOP"}>
            <a className="flex py-2 flex-col gap-1 items-center">
              <HiDocumentAdd size={20} />
              <p className="basis-2/3 text-sm">Add MOP</p>
            </a>
          </Link>
        </li>
        <li className="cursor-pointer hover:bg-primary hover:text-white duration-300 px-3 py-2 rounded-xl">
          <Link href={"/salesActivity"}>
            <a className="flex py-2 flex-col gap-1 items-center">
              <AiOutlineSchedule size={20} />
              <p className="basis-2/3 text-sm">Sales Activity</p>
            </a>
          </Link>
        </li>
        <li className="cursor-pointer hover:bg-primary hover:text-white duration-300 px-3 py-2 rounded-xl">
          <Link href={"/admin"}>
            <a className="flex py-2 flex-col gap-1 items-center">
              <AiOutlineSetting size={20} />
              <p className="basis-2/3 text-sm">Add MOP</p>
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Navbar;
