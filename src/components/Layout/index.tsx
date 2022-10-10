import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import Navbar from "./navbar";
import Footer from "./footer";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Eforel" }: Props) => (
  <div className="">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="z-0 min-w-screen min-h-screen bg-background flex flex-col">
      <header>
        <Navbar />
      </header>
      <div>
        <main className="min-h-screen">{children}</main>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  </div>
);

export default Layout;
