import React,{ useContext }  from "react";
import style from '../../css/compCss/Returnbutton.module.css';
import { storeContext } from "../stores/context";
import { useHistory  } from "react-router-dom";

const Returnbutton = () => {
  
  const {uiStore} = useContext(storeContext);
  const history = useHistory();

  return (
    <p className={`${style.Return} ${style[uiStore.themeClass]}`} onClick={() => { history.goBack(); }}>Return</p>
  );
};

export default Returnbutton;
