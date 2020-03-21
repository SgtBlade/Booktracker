import React,{ useState, useContext }  from "react";
import { useObserver } from "mobx-react-lite";
import Countdown from 'react-countdown-now';
import { useParams, Redirect } from "react-router-dom";
import style from '../../css/compCss/Detail.module.css';
import { storeContext } from "../hooks/context";
import Returnbutton from './Returnbutton.jsx';

const Detail = () => {

  const {store, uiStore} = useContext(storeContext);
  const { id } = useParams();
  const book = store.returnBookByIsbn(id);


  const [dateChanger, setDateChanger] = useState(false);
  const toggle = () => setDateChanger(!dateChanger);

  const handleSubmit = (e) => {
    e.preventDefault();
    store.changeBookDate(book);
    toggle();
  }

  const renderer = ({ days, hours, minutes, seconds, completed }) => { 
    if (completed) { 
      return '';
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

    <>
    <Returnbutton/>
    <article className={`${style.book} ${style[uiStore.themeClass]}`}>
      {book? (
        <>
      
        <img className={`${style.book__cover} ${style[uiStore.themeClass]}`} src={  book.image ? book.image : '../assets/img/placeholder.jpg'} alt={book.title + ' image'} height="430" width="300" />


        <section className={`${style.book__primaryInfo}`}>
        <h2 className={`${style.book__primaryInfo__title} ${style[uiStore.themeClass]}`}>{book.title}</h2>
        <p className={`${style.book__primaryInfo__countdown} ${style[uiStore.themeClass]}`}><Countdown date={book.release.getTime()} renderer={renderer}/></p> 


        {  (book.bookData) ? (
          <>
            <h3 className={`${style.book__primaryInfo__subtitle} ${style[uiStore.themeClass]}`}>{book.bookData.volumeInfo.subtitle}</h3>
       
            {book.bookData.volumeInfo.authors ? (
              <div className={`${style.book__primaryInfo__authorsWrap} ${style[uiStore.themeClass]}`}> Authors:
                <ul className={`${style.book__primaryInfo__authorsList} ${style[uiStore.themeClass]}`}>
                    {book.bookData.volumeInfo.authors.map((author) => (
                        <li className={`${style.book__primaryInfo__authorsList__item} ${style[uiStore.themeClass]}`} key={`${author}`}>{author}</li>
                      ))}
                </ul> 
              </div>  
                ) : ''}
              
            
        </>
        ) : ''}
        
        {dateChanger ? (
          <form onSubmit={e => handleSubmit(e)} className={`${style.detail__form} ${style[uiStore.themeClass]}`}>

            <label className={`${style.detail__form__label} ${style[uiStore.themeClass]}`} htmlFor="release">
              <p>Edit release:</p>
              <input 
              value={store.releaseField}
              onChange={e => store.setAdditionField("release", e.currentTarget.value)} 
              type="date" className={`${style.detail__form__label__input}  ${style[uiStore.themeClass]}`} name="release" id="release" 
                min={dateToString((new Date(Date.now()+1000*60*60*24)), '-', false)}></input>
                <span className={`${style.detail__form__label__error} ${style[uiStore.themeClass]} hidden`}>There is an issue with the date</span>
            </label>
            <input className={`${style.detail__form__label__submit} ${style[uiStore.themeClass]}`} type="submit"></input>

          </form>
          ) : 
          <p onDoubleClick={toggle} className={`${style.book__primaryInfo__date} ${style[uiStore.themeClass]}`}>Release: {dateToString(book.release, '-', false)}</p>}

        
        <p onClick={() => {navigator.clipboard.writeText(book.isbn)}} className={`${style.book__primarInfo__isbn} ${style[uiStore.themeClass]}`}>ISBN: {book.isbn}</p>
        </section>


        <section className={`${style.book__secondaryInfo} ${style[uiStore.themeClass]}`}>
          <h2 className={`${style.book__secondaryInfo__title} ${style[uiStore.themeClass]} hidden`}>About the book</h2>
          {book.bookData ? <p className={`${style.book__secondaryInfo__description} ${style[uiStore.themeClass]}`}>{book.bookData.volumeInfo.description}</p>: ''}


        <div className={`${style.book__secondaryInfo__storeLinks} ${style[uiStore.themeClass]}`}>
        <a target="_blank" rel="noopener noreferrer" href={`https://www.amazon.com/s?k=${book.isbn}&ref=nb_sb_noss`}><img src="../assets/icons/originals/amazon.png" alt="Amazon" height={60} width={60} /></a>
        <a target="_blank" rel="noopener noreferrer" href={`https://www.google.be/search?tbm=bks&hl=en&q=${book.isbn}`}><img src="../assets/icons/originals/google.png" alt="Goodreads" height={60} width={60} /></a>
        <a target="_blank" rel="noopener noreferrer" href={`https://www.goodreads.com/search?q=${book.isbn}`}><img src="../assets/icons/originals/goodReads.png" alt="Google books" height={60} width={60} /></a>
        <a target="_blank" rel="noopener noreferrer" href={`https://blackwells.co.uk/bookshop/product/${book.isbn}`}><img src="../assets/icons/originals/blackwells.jpg" alt="Blackwells books" height={60} width={60} /></a>
        <a target="_blank" rel="noopener noreferrer" href={`https://www.bookfinder.com/search/?author=&title=&lang=en&isbn=${book.isbn}&new_used=*&destination=be&currency=EUR&mode=basic&st=sr&ac=qr`}><img src="../assets/icons/originals/bookfinder.jpg " alt="Bookfinder" height={60} width={60} /></a>
        </div>
        </section>
        </>
      ) : <Redirect to="/" />}
      
    </article>
    </>
  ));
};

export default Detail;

/*
volumeInfo:
title: "Harry Potter and the Cursed Child"
subtitle: "Parts One and Two Playscript"
authors: (3) ["J. K. Rowling", "Jack Thorne", "John Tiffany"]
publisher: "Arthur A. Levine Books"
publishedDate: "2017-07-25"
description: "The Eighth Story. Nineteen Years Later. Based on an original story by J.K. Rowling, John Tiffany, and Jack Thorne, a play by Jack Thorne. It was always difficult being Harry Potter and it isn't much easier now that he is an overworked employee of the Ministry of Magic, a husband, and father of three school-age children. While Harry grapples with a past that refuses to stay where it belongs, his youngest son, Albus, must struggle with the weight of a family legacy he never wanted. As past and present fuse ominously, both father and son learn the uncomfortable truth: Sometimes, darkness comes from unexpected places. The playscript for Harry Potter and the Cursed Child was originally released as a "special rehearsal edition" alongside the opening of Jack Thorne's play in London's West End in summer 2016. Based on an original story by J.K. Rowling, John Tiffany, and Jack Thorne, the play opened to rapturous reviews from theatergoers and critics alike, while the official playscript became an immediate global bestseller. This revised edition updates the "special rehearsal edition" with the conclusive and final dialogue from the play, which has subtly changed since its rehearsals, as well as a conversation piece between director John Tiffany and writer Jack Thorne, who share stories and insights about reading playscripts. This edition also includes useful background information including the Potter family tree and a timeline of events from the wizarding world prior to the beginning of Harry Potter and the Cursed Child."
industryIdentifiers: Array(2)
0: {type: "ISBN_10", identifier: "1338216678"}
1: {type: "ISBN_13", identifier: "9781338216677"}
length: 2
__proto__: Array(0)
readingModes:
text: false
image: false
__proto__: Object
pageCount: 336
printType: "BOOK"
categories: Array(1)
0: "Juvenile Nonfiction"
length: 1
__proto__: Array(0)
averageRating: 3.5
ratingsCount: 175
maturityRating: "NOT_MATURE"
allowAnonLogging: false
contentVersion: "preview-1.0.0"
panelizationSummary:
containsEpubBubbles: false
containsImageBubbles: false
__proto__: Object
imageLinks:
smallThumbnail: "http://books.google.com/books/content?id=2BMDuAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
thumbnail: "http://books.google.com/books/content?id=2BMDuAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
__proto__: Object
language: "en"
previewLink: "http://books.google.be/books?id=2BMDuAEACAAJ&dq=isbn:9781338216677&hl=&cd=1&source=gbs_api"
infoLink: "http://books.google.be/books?id=2BMDuAEACAAJ&dq=isbn:9781338216677&hl=&source=gbs_api"
canonicalVolumeLink: "https://books.google.com/books/about/Harry_Potter_and_the_Cursed_Child.html?hl=&id=2BMDuAEACAAJ"
__proto__: Object
*/