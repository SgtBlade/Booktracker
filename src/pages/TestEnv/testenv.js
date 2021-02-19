import React from "react";
import { useObserver } from "mobx-react-lite";
import style from "./testenv.module.css";
const Testenv = () => {
  
  //Test environment, just to do what you want and test new features
  return useObserver(() => (
    <div className={style.wrap}>
     
    </div>
  ));
};

export default Testenv;
