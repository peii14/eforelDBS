import React, { ReactNode, Suspense } from "react";
import Link from "next/link";
import Head from "next/head";
import Navbar from "./navbar";
import Footer from "./footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  children?: ReactNode;
  title?: string;
  session: any;
};

const Layout = ({ children, title = "Eforel", session }: Props) => {
  console.log(session);
  return (
    <>
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
          limit={1}
          pauseOnFocusLoss
        />

        <div className=" min-h-screen flex flex-row  gap-16">
          <header
            className={`basis-1/12 ${session && children ? "block" : "hidden"}`}
          >
            <Navbar role={session ? Number(session.user.role) : null} />
          </header>
          <main className={`basis-5/6 p-10 min-h-screen overflow-y-hidden`}>
            {children}
          </main>
        </div>

        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Layout;
