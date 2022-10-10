import Link from "next/link";

const Navbar = () => {
  return (
    <div className="h-5/6 w-40 fixed left-3 top-1/2 -translate-y-1/2 z-20 shadow-xl bg-white  shadow-slate-700 p-5 px-2 rounded-xl ">
      <ul className="flex flex-col justify-center align-middle py-5 gap-2">
        <li className="cursor-pointer hover:bg-primary hover:text-white duration-300 px-5 py-2 rounded-xl">
          <Link href={"/dashboard"}>
            <p>Dashboard</p>
          </Link>
        </li>
        <li className="cursor-pointer hover:bg-primary hover:text-white duration-300 px-5 py-2 rounded-xl">
          <Link href={"/addCustomer"}>
            <p>Add Customer</p>
          </Link>
        </li>
        <li className="cursor-pointer hover:bg-primary hover:text-white duration-300 px-5 py-2 rounded-xl">
          <Link href={"/addPIC"}>
            <p>Add PIC</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Navbar;
