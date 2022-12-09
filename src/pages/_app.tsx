import { SessionProvider, useSession } from "next-auth/react";
import "@/styles/globals.css";
import { StoreProvider } from "@/utils/Store";
import { Suspense } from "react";
const App = ({ Component, pageProps: { session, ...pageProps } }) => (
  <SessionProvider session={session}>
    <StoreProvider>
      {Component.auth ? (
        <Auth adminOnly={Component.auth.adminOnly}>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </StoreProvider>
  </SessionProvider>
);
function Auth({ children }: any) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}

export default App;
