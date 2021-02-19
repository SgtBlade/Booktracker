import React from "react";
import { useStores } from "../hooks/useStores";
import PropTypes from "prop-types";
import { useObserver } from "mobx-react-lite";
import Booklinks from "./Bookslinks.jsx";
import style from './css/compCss/BookOwnerstatus.module.css';

const BookOwnerStatus = ({status, setowned, isbn}) => {

    const {uiStore} = useStores();
    
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
