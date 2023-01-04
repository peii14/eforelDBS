import { SessionProvider, useSession } from "next-auth/react";
import "@/styles/globals.css";
import { StoreProvider } from "@/utils/Store";
import { useEffect, useState } from "react";
import Router from "next/router";
import Loading from "@/components/Layout/loading";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <SessionProvider session={session}>
      <StoreProvider>
        {loading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            {Component.auth ? (
              <Auth adminOnly={Component.auth.adminOnly}>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </>
        )}
      </StoreProvider>
    </SessionProvider>
  );
};
function Auth({ children }: any) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}

export default App;
