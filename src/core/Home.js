import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import homeimg from './home.png'
function Home() {
  // const [products, setProducts] = useState([]);
  // const [error, seterror] = useState(false);

  // const loadAllProduct = () => {
  //   getProducts().then(data => {
  //     if (data.error) {
  //       seterror(data.error);
  //     } else {
  //       setProducts(data);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   loadAllProduct();
  // }, []);

  return (
    <Base title="EasyAppoint Pro" description={<img src={homeimg} alt="" className="img img-fluid" />} className={"d-none"}>

    </Base>
  );
}

export default Home;
