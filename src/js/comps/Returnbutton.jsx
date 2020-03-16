import React,{ useContext }  from "react";
import style from '../../css/compCss/Returnbutton.module.css';
import { storeContext } from "../hooks/context";
import { NavLink  } from "react-router-dom";
import {ROUTES} from '../consts/routes.js'

const Returnbutton = () => {
  
  const {uiStore} = useContext(storeContext);

  return (
    <NavLink style={{ textDecoration: 'none' }} to={ROUTES.home} ><p className={`${style.Return} ${style[uiStore.themeClass]}`}>Return</p></NavLink>
  );
};

export default Returnbutton;
