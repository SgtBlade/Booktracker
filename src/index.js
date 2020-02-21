import React from 'react';
import ReactDOM from 'react-dom';
import { useObserver } from "mobx-react-lite";
import Countdown from 'react-countdown-now';
import './reset.css';
import './style.css';
import Store from './js/Store';
import { STATE } from './js/comment';

const store = new Store();
store.seedbookPosts();

const App = () => {
  const dateToString = (date, character = '/', reverse = true) => {
        var dd = date.getDate();

    var mm = date.getMonth()+1; 
    var yyyy = date.getFullYear();
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    
    let formatted = '';
    (reverse) ? formatted = dd+character+mm+character+yyyy : formatted = yyyy+character+mm+character+dd;
    return  formatted;
  }

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return 'Out now!';
    } else {
      let formattedString = `${days} Days ${(hours >= 10) ? hours : `0${hours}`}:${(minutes >= 10) ? minutes : `0${minutes}`}:${(seconds >= 10) ? seconds : `0${seconds}`} hours`;
      return formattedString;
    }
  };


  return useObserver(() => (
    <>
    <section className="books__week">
        <h2 className="books__week--title">Books</h2>
        {store.bookPosts.map((book, index) => (
                  <article key={`${book.isbn}${index}`} className="books__week--book">
                  <div className="book__leftSide" onClick={() => {navigator.clipboard.writeText(book.isbn)}}>
                    <img className="book__leftSide--image" src={  (book.bookData) ? book.bookData.volumeInfo.imageLinks.thumbnail : ''} alt={book.title + ' image'} height={300} />
                    <div className="book__leftSite--hover" />
                    <div className="book__leftSide--info">
                      <h2>{book.title}</h2>
                      <p>{dateToString(book.release)}</p>
                    </div>
                  </div>
                  <div className="book__rightSide">
                  <p className="book__rightSide--countDown">
                  <Countdown date={book.release.getTime()} renderer={renderer} />
                  </p>
        
                    <div className="book__rightSide__messages">
                      {book.comments.map((comment, index) => (
                        <div key={`${book.isbn}${comment}${index}`} className="book__rightSide__messages__message">
                        <p className="book__rightSide__messages__message--user">{comment.user}</p>
                          <div className="book__rightSide__messages__message--bubble">
                            <p className="book__rightSide__messages__message--text">{comment.content}</p>
                            <p className="book__rightSide__messages__message__votes"> 
                              <span onClick={()=>comment.upvote() } className={`book__rightSide__messages__message__votes--upvote ${comment.state === STATE.upvote ? "selectedUpvote" : '' }`}>{comment.upvotes}</span> 
                              <span onClick={()=>comment.downvote() } className={`book__rightSide__messages__message__votes--downvote ${comment.state === STATE.downvote ? "selectedDownvote" : '' }`}>{comment.downvotes}</span>
                            </p>
                          </div> 
                        </div>
                      ))}
                      
                      
                    </div>
        
                    <form onSubmit={e => store.addCommentToBookpost(book, e)} className="book__rightSide__form">
                      <input className="book__rightSide__form--input" id={`content${index}`} name="content" placeholder="Typ een bericht" />
                      <svg className="book__rightSide__form__counter">
                        <circle className="book__rightSide__form__counter--circlePlain" cx="50%" cy="50%" r={13} />
                        <circle className="book__rightSide__form__counter--circleColored" cx="50%" cy="50%" r={13} />
                      </svg>
                    </form>
        
                    <div onClick={()=>store.removeBookPost(book) } className="book__rightSide__check">
                      <span className="book__rightSide__check--check hidden" />
                      <span className="book__rightSide__check--cross" />
                    </div>
        
                  </div>
                    {book.owned ? (
                  <div className="book__links">
                    <p onClick={()=>book.setOwned() } className={`book__links--statusOwned ${book.owned ? '' : 'hidden' }`}>owned</p>
                  </div>
                    ) 
                    : (
                    
                    <div className="book__links">
                    <a target="_blank" rel="noopener noreferrer" href={`https://www.amazon.com/s?k=${book.isbn}&ref=nb_sb_noss`}><img src="./assets/icons/amazon.png" alt="Amazon" height={30} width={30} /></a>
                    <a target="_blank" rel="noopener noreferrer" href={`https://www.google.be/search?tbm=bks&hl=en&q=${book.isbn}`}><img src="./assets/icons/goodReads.png" alt="Goodreads" height={30} width={30} /></a>
                    <a target="_blank" rel="noopener noreferrer" href={`https://www.goodreads.com/search?q=${book.isbn}`}><img src="./assets/icons/google.png" alt="Google books" height={30} width={30} /></a>
                    <a target="_blank" rel="noopener noreferrer" href={`https://blackwells.co.uk/bookshop/product/${book.isbn}`}><img src="./assets/icons/blackwells.png" alt="Blackwells books" height={30} width={30} /></a>
                    <a target="_blank" rel="noopener noreferrer" href={`https://www.bookfinder.com/search/?author=&title=&lang=en&isbn=${book.isbn}&new_used=*&destination=be&currency=EUR&mode=basic&st=sr&ac=qr`}><img src="./assets/icons/bookfinder.png " alt="Bookfinder" height={30} width={30} /></a>
                    <p onClick={()=>book.setOwned() } className={`book__links--statusUnowned ${!book.owned ? '' : 'hidden' }`}>Mark as owned</p>
                    </div>
                    )}
                    
                </article>
              
        ))}


    <article className="books__newBook">
      <h2>New book</h2>
      <form onSubmit={e => store.addbookPost(e)} className="books__newBook__form">
        <label className="books__newBook__form--label" htmlFor="bookTitle">
          Title:
          <input className="book__rightSide__form--input" name="bookTitle" id="bookTitle" placeholder="" />
          <span className="books__newBook__form--label--error hidden">Title is too short or empty</span>
        </label>

        <label className="books__newBook__form--label" htmlFor="release">
          Release:
          <input type="date" className="book__rightSide__form--input" name="release" id="release" 
            //value={dateToString((new Date(Date.now()+1000*60*60*24)), '-', false)}
            min={dateToString((new Date(Date.now()+1000*60*60*24)), '-', false)}></input>
            <span className="books__newBook__form--label--error hidden">There is an issue with the date</span>
        </label>

        <label className="books__newBook__form--label" htmlFor="isbn">
          ISBN:
          <input type="number" className="book__rightSide__form--input" name="isbn" id="isbn" placeholder="" />
          <span className="books__newBook__form--label--error hidden">ISBN not found</span>
        </label>

        <input className="books__newBook__form--submit" type="submit"></input>
      </form>
    </article>
      </section>
    </>
    ));
}





ReactDOM.render(<App />, document.getElementById('root'));

/*
kind: "books#volume"id: "OayBxwEACAAJ"etag: "9GbJuVel1OU"selfLink: "https://www.googleapis.com/books/v1/volumes/OayBxwEACAAJ"
volumeInfo: 
title: "Stud Muffin"authors: Array(2)0: "Smartypants Romance"1: "Jiffy Kate"length: 2__proto__: Array(0)publishedDate: "2019-10-22"
description: "It's hard to get revenge without getting a rap sheet. After Tempest Cassidy walks in on her husband banging her high school nemesis, her whole world gets turned upside down. She goes from being known as the Duchess of Muffins to the town crazy. Her new MO: revenge. Eventually, Tempest grows weary being arrested. Yet what choice does she have? If she's not angry, then she's simply . . . sad. Just as she decides to get her life back on track, in walks Cage Erickson, the new bouncer at the local strip club. He's scary-handsome and the polar opposite of her ex. She's attracted to him, but she's not looking for a rebound. He's attracted to her, but he's not looking for a serious relationship. So, they agree to be friends. But when lines get blurred in the friend zone, will they both get burned? Or will it be a TKO? 'Stud Muffin' is a full-length contemporary romantic comedy, can be read as a standalone, and is book#2 in the Donner Bakery series, Green Valley World, Penny Reid Book Universe."industryIdentifiers: Array(2)0: {type: "ISBN_10", identifier: "194920216X"}1: {type: "ISBN_13", identifier: "9781949202168"}length: 2__proto__: Array(0)readingModes: text: falseimage: false__proto__: ObjectpageCount: 302printType: "BOOK"categories: Array(1)0: "Fiction"length: 1__proto__: Array(0)maturityRating: "NOT_MATURE"allowAnonLogging: falsecontentVersion: "preview-1.0.0"panelizationSummary: containsEpubBubbles: falsecontainsImageBubbles: false__proto__: ObjectimageLinks: smallThumbnail: "http://books.google.com/books/content?id=OayBxwEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"thumbnail: "http://books.google.com/books/content?id=OayBxwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"__proto__: Objectlanguage: "en"previewLink: "http://books.google.be/books?id=OayBxwEACAAJ&dq=isbn:9781949202168&hl=&cd=1&source=gbs_api"infoLink: "http://books.google.be/books?id=OayBxwEACAAJ&dq=isbn:9781949202168&hl=&source=gbs_api"canonicalVolumeLink: "https://books.google.com/books/about/Stud_Muffin.html?hl=&id=OayBxwEACAAJ"__proto__: ObjectsaleInfo: country: "BE"saleability: "NOT_FOR_SALE"isEbook: false__proto__: ObjectaccessInfo: country: "BE"viewability: "NO_PAGES"embeddable: falsepublicDomain: falsetextToSpeechPermission: "ALLOWED"epub: {isAvailable: false}isAvailable: false__proto__: Objectpdf: {isAvailable: false}isAvailable: false__proto__: ObjectwebReaderLink: "http://play.google.com/books/reader?id=OayBxwEACAAJ&hl=&printsec=frontcover&source=gbs_api"accessViewStatus: "NONE"quoteSharingAllowed: false__proto__: ObjectsearchInfo: textSnippet: "Or will it be a TKO? &#39;Stud Muffin&#39; is a full-length contemporary romantic comedy, can be read as a standalone, and is book#2 in the Donner Bakery series, Green Valley World, Penny Reid Book Universe."__proto__: Object__proto__: constructor: ƒ Object()__defineGetter__: ƒ __defineGetter__()__defineSetter__: ƒ __defineSetter__()hasOwnProperty: ƒ hasOwnProperty()__lookupGetter__: ƒ __lookupGetter__()__lookupSetter__: ƒ __lookupSetter__()isPrototypeOf: ƒ isPrototypeOf()propertyIsEnumerable: ƒ propertyIsEnumerable()toString: ƒ toString()valueOf: ƒ valueOf()toLocaleString: ƒ toLocaleString()get __proto__: ƒ __proto__()set __proto__: ƒ __proto__()
*/