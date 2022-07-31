import Navbar from "../components/navbar";
import "../styles/global.css";
import { useRouter } from "next/router";
import axios from "axios";
export default function App({ Component, pageProps }) {
  const { asPath, pathname } = useRouter();
  axios.defaults.baseURL = "http://localhost:3001";
  axios.defaults.withCredentials = true;
  return <Component {...pageProps} />;
}
