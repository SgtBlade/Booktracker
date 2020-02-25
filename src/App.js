import React from 'react';
import logo from './logo.svg';
import './css/vars.css';
import './css/reset.css';
import './css/style.css';
import { useObserver } from "mobx-react-lite";
import Countdown from 'react-countdown-now';
import Store from './js/stores/Store';
import { STATE } from './js/modules/comment';
import { VIEWSTATE } from './js/modules/bookPost';


const store = new Store();
store.seedbookPosts();

function App() {

    
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

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return 'Out now!';
    } else {
      let formattedString = `${days} Days ${(hours >= 10) ? hours : `0${hours}`}:${(minutes >= 10) ? minutes : `0${minutes}`}:${(seconds >= 10) ? seconds : `0${seconds}`} hours`;
      return formattedString;
    }
  };

  const getGradient = (count) => { return {backgroundImage: `conic-gradient(#e2a5fe ${count}%, #696caa ${count}%)`} }

  const handleSubmit = (e, type, object = null) => {
    e.preventDefault();
    if(type === 'comment')object.addComment(store.user);
    else if(type === 'book')store.addbookPost();
  }

  return useObserver(() => (
     <>
    <section className="books__week">
        <h2 className="books__week--title">Books</h2>
        {store.bookPosts.map((book, index) => (
                  <article key={`${book.isbn}${index}`} className="books__week--book">
                  <div className="book__leftSide" onClick={() => {navigator.clipboard.writeText(book.isbn)}}>
                    <img className="book__leftSide--image" src={  (book.bookData) ? book.bookData.volumeInfo.imageLinks.thumbnail : './assets/img/placeholder.jpg'} alt={book.title + ' image'} height="300" width="200" />
                    <div className="book__leftSite--hover" />
                    <div className="book__leftSide--info">
                      <h2>{book.title}</h2>
                      <p>{dateToString(book.release)}</p>
                    </div>
                  </div>
                  <div className="book__rightSide">
                  <p onClick={()=>book.changeView() } className="book__rightSide--countDown">
                  <Countdown date={book.release.getTime()} renderer={renderer} />
                  </p>
                  {book.view === VIEWSTATE.comments ? (
                    <div className="book__rightSide__messages">
                      {book.comments.map((comment, index) => (
                        <div key={`${book.isbn}${comment}${index}`} className="book__rightSide__messages__message">
                        <p className="book__rightSide__messages__message--user">{comment.user.name}</p>
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
                  ) : (
                    <p className="book__rightSide__description">{  (book.bookData) ? book.bookData.volumeInfo.description : ''}</p>
                  )}

                  {book.view === VIEWSTATE.comments ? (
                    <form onSubmit={e => handleSubmit(e, 'comment', book)} className="book__rightSide__form">
                            <input value={book.newCommentField} onChange={e => book.setComment(e.currentTarget.value)} className="book__rightSide__form--input" id={`content${index}`} name="content" placeholder="Typ een bericht" />
                            <div className="book__rightSide__form--counter" style={getGradient(book.wordCountPercentage)}>
                              <p className="book__rightSide__form--counter--child"></p>
                            </div>
                    </form>
                  ) : ('')}

                  <div onClick={()=>store.removeBookPost(book) } className="book__rightSide__check">
                     <span className="book__rightSide__check--check hidden" />
                     <span className="book__rightSide__check--cross" />
                  </div>
        
                  </div>
                    {book.owned ? (
                  <div onClick={()=>book.setOwned() } className="book__links book__links--owned">
                    <p className={`book__links--statusOwned ${book.owned ? '' : 'hidden' }`}>owned</p>
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
      <form onSubmit={e => handleSubmit(e, 'book')} className="books__newBook__form">
        <label className="books__newBook__form--label" htmlFor="bookTitle">
          Title:
          <input 
          value={store.titleField}
          onChange={e => store.setAdditionField("title", e.currentTarget.value)} 
          className="book__rightSide__form--input" name="bookTitle" id="bookTitle" />
          <span className="books__newBook__form--label--error hidden">Title is too short or empty</span>
        </label>

        <label className="books__newBook__form--label" htmlFor="release">
          Release:
          <input
          value={store.releaseField}
          onChange={e => store.setAdditionField("release", e.currentTarget.value)} 
           type="date" className="book__rightSide__form--input" name="release" id="release" 
            min={dateToString((new Date(Date.now()+1000*60*60*24)), '-', false)}></input>
            <span className="books__newBook__form--label--error hidden">There is an issue with the date</span>
        </label>

        <label className="books__newBook__form--label" htmlFor="isbn">
          ISBN:
          <input 
          value={store.isbnField} 
          onChange={e => store.setAdditionField("isbn", e.currentTarget.value)} 
          type="text" className="book__rightSide__form--input" name="isbn" id="isbn" />
          <span className="books__newBook__form--label--error hidden">ISBN not found</span>
        </label>

        <input className="books__newBook__form--submit" type="submit"></input>
      </form>
    </article>
      </section>
    </>
  ));
}

export default App;
