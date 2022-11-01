import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import Navbar from "./navbar";
import Footer from "./footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";

type Props = {
  children?: ReactNode;
  title?: string;
  session?: boolean;
};

const Layout = ({ children, title = "Eforel" }: Props) => {
  const { status, data: session } = useSession();

  return (
    <div className="">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="z-0 min-w-screen min-h-screen bg-background flex flex-col">
        <ToastContainer
          rtl={false}
          autoClose={3000}
          position="bottom-center"
          limit={5}
          pauseOnFocusLoss
        />
        <div className=" min-h-screen flex flex-row  gap-16">
          <header className={`basis-1/12 ${session ? "block" : "hidden"}`}>
            <Navbar />
          </header>
          <div className="basis-5/6 p-10 min-h-screen overflow-y-hidden">
            <main className="">{children}</main>
          </div>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default Layout;
