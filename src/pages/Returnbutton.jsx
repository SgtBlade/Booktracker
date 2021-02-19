import React from "react";
import { useStores } from "../hooks/useStores";
import style from './css/compCss/Returnbutton.module.css';
import { NavLink  } from "react-router-dom";
import {ROUTES} from '../consts/index.js'

const Returnbutton = () => {
  
  const {uiStore} = useStores();

  return (
    <NavLink style={{ textDecoration: 'none' }} to={ROUTES.home} ><p className={`${style.Return} ${style[uiStore.themeClass]}`}>Return</p></NavLink>
  );
};

export default Returnbutton;
