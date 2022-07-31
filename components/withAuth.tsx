import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./loader"
import Navbar from "./navbar";
import React from "react";
const withAuth = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();
    const [verified, setVerified] = useState(false);
    const [loader, setloader] = useState(true);
    useEffect(() => {
      var config = {
        method: "get",
        url: "/verify",
        withCredentials: true,
        
      };
      axios(config)
        .then(function (response) {
          if (response.data.status) {
            setVerified(true);
          } else {
            Router.push("/login");
          }
          setloader(false);
        })
        .catch(function (error) {
          if (verified == false) {
            Router.push("/login");
          }
        });
    }, []);

    if (loader) {
      return <Loader />;
    } else {
      if (verified) {
        return (
          <>
            <Navbar></Navbar>
            <WrappedComponent {...props}></WrappedComponent>
          </>
        );
      } else {
        return null;
      }
    }
  };
};

export default withAuth;
