import React, { useState, useContext}  from "react";
import PropTypes from "prop-types";
import Countdown from 'react-countdown-now';
import { useObserver } from "mobx-react-lite";
import Bookstatus from "./BookOwnerstatus.jsx";
import Bookcover from "./Bookcover.jsx";
import BookpostMessages from "./BookpostMessages.jsx";
import style from '../../css/compCss/Bookpost.module.css';
import { storeContext } from "../stores/context";


const Bookpost = ({book, onMouseDown}) => {

  
  
  const {store, uiStore} = useContext(storeContext);
  const [viewComments, setViewComments] = useState(true);
  const toggle = () => setViewComments(!viewComments);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    
    if (completed) { 
      return 'Out now!';
    } else {
      let formattedString = `${days} Days ${(hours >= 10) ? hours : `0${hours}`}:${(minutes >= 10) ? minutes : `0${minutes}`}:${(seconds >= 10) ? seconds : `0${seconds}`} hours `;
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
    
    <article onMouseDown={e => onMouseDown(e, book.isbn)} className={`${style.books__week__book} ${style[uiStore.themeClass]}`}>

    <Bookcover bookisbn={book.isbn} booktitle={book.title} bookData={book.bookData} bookrelease={dateToString(book.release)} ></Bookcover>

    <div className={`${style.book__rightSide} ${style[uiStore.themeClass]}`}>

    <p  className={`${style.book__rightSide__countDown} ${style[uiStore.themeClass]}`}>
      <span onClick={toggle}>
        <Countdown date={book.release.getTime()} renderer={renderer}/>  
      </span>
      {(book.release < Date.now() && !book) ? (
        <span className={`${style.book__rightSide__refresh} ${style[uiStore.themeClass]}`} onClick={e => book.getBookData(book.isbn)}> &#x21bb;</span>
       ) : ''}
    </p>
    

    {viewComments ? (
      <BookpostMessages book={book}></BookpostMessages>
    ) : (
      <p className={`${style.book__rightSide__description} ${style[uiStore.themeClass]}`}>{  (book.bookData) ? book.bookData.volumeInfo.description : ''}</p>
    )}

      {book.originalPoster.id === store.user.id ? (
        <div onClick={()=>store.removeBookPost(book) } className={`${style.book__rightSide__check} ${style[uiStore.themeClass]}`}>
          <span className={`${style.book__rightSide__check__check} hidden ${style[uiStore.themeClass]}`} />
          <span className={`${style.book__rightSide__check__cross} ${style[uiStore.themeClass]}`} />
        </div>
      ) : '' }

    

    </div>
      <Bookstatus setowned={()=>book.setOwned()} status={book.owned} isbn={book.isbn}></Bookstatus>
      
  </article>



  ));
};

Bookpost.propTypes = {
  book: PropTypes.object.isRequired
};

export default Bookpost;
