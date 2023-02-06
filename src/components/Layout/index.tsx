import React, { ReactNode, Suspense, useState } from "react";
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
  const [onHover, setHover] = useState(false);
  const [height, setHeight]: any = useState(0);

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

        <div className="min-h-screen flex flex-row justify-between space-x-16">
          <header
            className={`hover:basis-1/12 basis-0 duration-300 ${
              session && children ? "block" : "hidden"
            }`}
            onMouseEnter={() => {
              setHover(!onHover);
              setHeight(20);
            }}
            onMouseLeave={() => {
              setHover(!onHover);
              setHeight(0);
            }}
          >
            <Navbar
              isOpen={onHover}
              height={height}  
              role={session ? session.user.role : null}
            />
          </header>
          <main
            className={`duration-300 bg-transparent pl-5 pr-20  ${
              onHover ? "basis-11/12 " : "basis-11/12"
            } py-10 min-h-screen overflow-y-hidden`}
          >
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
