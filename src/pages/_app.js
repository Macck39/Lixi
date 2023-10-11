import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import WhatsappChat from "./whatsappChat";


export default function App({ Component, pageProps }) {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Component {...pageProps} />
      <WhatsappChat />
      <Footer />
    </>
  );
}
