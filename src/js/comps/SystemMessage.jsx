import React, {useContext} from "react";
import style from '../../css/compCss/SystemMessage.module.css';
import { storeContext } from "../hooks/context";

const SystemMessage = ({warningMessage, positiveMessage}) => {

  const {uiStore} = useContext(storeContext);

  return (<p className={`${style.SystemMessage} ${positiveMessage ? style.positiveSystemMessage : style.badSystemMessage} ${style[uiStore.themeClass]}`}>{warningMessage}</p> );
};

export default SystemMessage;
