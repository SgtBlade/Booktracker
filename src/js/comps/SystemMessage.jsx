import React, {useContext} from "react";
import style from '../../css/compCss/SystemMessage.module.css';
import { storeContext } from "../stores/context";

const SystemMessage = ({message, positive}) => {

  const {uiStore} = useContext(storeContext);

  return (<p className={`${style.SystemMessage} ${positive ? style.positiveSystemMessage : style.badSystemMessage} ${style[uiStore.themeClass]}`}>{message}</p> );
};

export default SystemMessage;
