import React,{ useContext }  from "react";
import PropTypes from "prop-types";
import { useObserver } from "mobx-react-lite";
import Booklinks from "./Bookslinks.jsx";
import style from '../../css/compCss/BookOwnerstatus.module.css';
import { storeContext } from "../hooks/context";

const BookOwnerStatus = ({status, setowned, isbn}) => {

    const {uiStore} = useContext(storeContext);
    
  return useObserver(()=>(
      <>
    {status ? (
        <div onClick={setowned } className={`${style.book__links} ${style[uiStore.themeClass]}`}>
          <p className={`${style.book__links__statusOwned} ${style[uiStore.themeClass]}`}>owned</p>
        </div>
          ) 
          : (
            <Booklinks bookisbn={isbn} setowned={setowned}/>
          )}
        </>

  ));
};

BookOwnerStatus.propTypes = {
  status: PropTypes.bool.isRequired,
  setowned: PropTypes.func.isRequired,
  isbn: PropTypes.string.isRequired
};

export default BookOwnerStatus;
