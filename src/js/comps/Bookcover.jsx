import React,{ useContext }  from "react";
import PropTypes from "prop-types";
import { useObserver } from "mobx-react-lite";
import style from '../../css/compCss/Bookcover.module.css';
import { storeContext } from "../stores/context";

const Bookcover = ({bookisbn, bookdata, booktitle, bookrelease}) => {
  
  const {uiStore} = useContext(storeContext);

     
  return useObserver (() => (
    <div className={`${style.book__leftSide} ${uiStore.themeClass}`} onClick={() => {navigator.clipboard.writeText(bookisbn)}}>
      <img className={`${style.book__leftSide__image} ${uiStore.themeClass}`} src={  (bookdata) ? bookdata.volumeInfo.imageLinks.thumbnail : './assets/img/placeholder.jpg'} alt={booktitle + ' image'} height="300" width="200" />
      <div className={`${style.book__leftSite__hover} ${uiStore.themeClass}`} />
      <div className={`${style.book__leftSide__info} ${style[uiStore.themeClass]}`}>
        <h2>{booktitle}</h2>
        <p>{bookrelease}</p>
      </div>
    </div>
  ));
};

Bookcover.propTypes = {
  bookisbn: PropTypes.string.isRequired,
  booktitle: PropTypes.string.isRequired,
  bookrelease: PropTypes.string.isRequired
};

export default Bookcover;
