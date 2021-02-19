import React from "react";
import { useStores } from "../hooks/useStores";
import style from './css/compCss/SystemMessage.module.css';

const SystemMessage = ({warningMessage, positiveMessage}) => {

  const {uiStore} = useStores();

  return (<p className={`${style.SystemMessage} ${positiveMessage ? style.positiveSystemMessage : style.badSystemMessage} ${style[uiStore.themeClass]}`}>{warningMessage}</p> );
};

export default SystemMessage;
