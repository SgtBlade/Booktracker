import React, { useState, useContext}  from "react";
import PropTypes from "prop-types";
import Countdown from 'react-countdown-now';
import {useHistory} from "react-router-dom";
import { useObserver } from "mobx-react-lite";
import Bookstatus from "./BookOwnerstatus.jsx";
import Bookcover from "./Bookcover.jsx";
import style from '../../css/compCss/Bookpost.module.css';
import { storeContext } from "../hooks/context";
import {ROUTES} from '../consts/routes.js';


const Bookpost = ({book}) => {

  const {store, uiStore} = useContext(storeContext);
  const [viewComments, setViewComments] = useState(true);
  const toggle = () => setViewComments(!viewComments);
  let history = useHistory();

  const handleDbclick = () =>  {if(document.activeElement.nodeName !== 'INPUT')history.push(`${ROUTES.detail.to}${book.isbn}`);}

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    
    if (completed) { 
      return 'Out now!';
    } else {
      let formattedString = `${days} ${days <= 1 ? 'Day' : 'Days'} ${(hours >= 10) ? hours : `0${hours}`}:${(minutes >= 10) ? minutes : `0${minutes}`}:${(seconds >= 10) ? seconds : `0${seconds}`} hours `;
      return formattedString;
    }
  };

  const dateToString = (date, character = '/', reverse = true) => {
    let dd = date.getDate();
    let mm = date.getMonth()+1; 
    let yyyy = date.getFullYear();
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    
    let formatted = '';
    (reverse) ? formatted = dd+character+mm+character+yyyy : formatted = yyyy+character+mm+character+dd;
    return  formatted;
  }
    
  return useObserver(() => (
    
    <article onDoubleClick={handleDbclick} className={`${style.books__week__book} ${style[uiStore.themeClass]}`}>

    <Bookcover bookisbn={book.isbn} booktitle={book.title} bookImage={book.image} bookrelease={dateToString(book.release)} />

    <div className={`${style.book__rightSide} ${style[uiStore.themeClass]}`}>

    <p  className={`${style.book__rightSide__countDown} ${style[uiStore.themeClass]}`}>
      <span onClick={toggle}>
        <Countdown date={book.release.getTime()} renderer={renderer}/>  
      </span>
      <span className={`${style.book__rightSide__refresh} ${style[uiStore.themeClass]}`} onClick={e => store.updateBookData(book)}> &#x21bb;</span>
    </p>
    

      {book.originalPoster.id === store.user.id ? (
        <div onClick={()=>store.removeBookPost(book) } className={`${style.book__rightSide__check} ${style[uiStore.themeClass]}`}>
          <span className={`${style.book__rightSide__check__check} hidden ${style[uiStore.themeClass]}`} />
          <span className={`${style.book__rightSide__check__cross} ${style[uiStore.themeClass]}`} />
        </div>
      ) : '' }

    

    </div>
      <Bookstatus setowned={()=>book.setOwned()} status={book.owned} isbn={book.isbn} />
      
  </article>



  ));
};

Bookpost.propTypes = {
  book: PropTypes.object.isRequired
};

export default Bookpost;
