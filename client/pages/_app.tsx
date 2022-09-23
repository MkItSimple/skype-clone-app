import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppContextProvider } from "../context/AppContext";
import { GlobalStyles } from "../public/GlobalStyles";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppContextProvider>
        <ToastContainer autoClose={10000} />
        <GlobalStyles />
        <Component {...pageProps} />
      </AppContextProvider>
    </>
  );
}

export default MyApp;
