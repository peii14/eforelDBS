import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import Navbar from "./navbar";
import Footer from "./footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


type Props = {
  children?: ReactNode;
  title?: string;
  session?: boolean;
};

const Layout = ({ children, title = "Eforel", session = false }: Props) => (
  <div className="">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="z-0 min-w-screen min-h-screen bg-background flex flex-col">
      <header className={`${session ? "block" : "hidden"}`}>
        <Navbar />
      </header>
      <div>
      <ToastContainer
        rtl={false}
        autoClose={3000}
        position="bottom-center"
        limit={5}
        pauseOnFocusLoss
      />
        <main className="min-h-screen">{children}</main>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  </div>
);

export default Layout;
