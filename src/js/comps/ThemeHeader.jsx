import React,{ useContext }  from "react";
import { useObserver } from "mobx-react-lite";
import style from '../../css/compCss/ThemeHeader.module.css';
import { storeContext } from "../hooks/context";
import {NavLink, useLocation} from 'react-router-dom';
import {ROUTES} from '../consts/routes.js'

const ThemeHeader = () => {
  
  const {uiStore} = useContext(storeContext);
  const currentLocation = useLocation().pathname;

  return useObserver (() => ( 
        <div className={`${style.theme__toggleButton} ${style[uiStore.themeClass]}`}>
          { (currentLocation === ROUTES.add ? '' : <NavLink to={ROUTES.add} > <button className={`${style.plus__button} ${style[uiStore.themeClass]}`}/> </NavLink> )}
          
          <div className={`${style.theme__switch} ${style[uiStore.themeClass]}`}>
            <p>Dark mode: </p>
            <input defaultChecked onClick={()=>uiStore.toggle()} type="checkbox" id="toggle" />
            <label htmlFor="toggle"></label>
            <div className={`${style[uiStore.themeClass]}`}></div>
          </div>

        </div>
  ));
}; 

export default ThemeHeader;
