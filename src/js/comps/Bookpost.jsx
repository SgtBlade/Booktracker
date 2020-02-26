import React, { useState }  from "react";
import Countdown from 'react-countdown-now';
import { useObserver } from "mobx-react-lite";
import Comment from "./Comment.jsx";
import Bookstatus from "./BookOwnerstatus.jsx";
import Bookcover from "./Bookcover.jsx";


const Bookpost = (props) => {
  
  const book = props.bookData;  
  const store = props.store;  
  const dateToString = props.dateConverter;  
  const handleSubmit = props.handler;  
  const UIStore = props.uistore;

  const [viewComments, setViewComments] = useState(true);
  const toggle = () => setViewComments(!viewComments);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return 'Out now!';
    } else {
      let formattedString = `${days} Days ${(hours >= 10) ? hours : `0${hours}`}:${(minutes >= 10) ? minutes : `0${minutes}`}:${(seconds >= 10) ? seconds : `0${seconds}`} hours`;
      return formattedString;
    }
  };

  const getGradient = (count) => { return {backgroundImage: `conic-gradient(rgb(224, 127, 0) ${count}%, #696caa ${count}%)`} }
    
  return useObserver(() => (
    
    <article className={`books__week--book ${UIStore.themeClass}`}>

    <Bookcover bookisbn={book.isbn} uistore={UIStore} booktitle={book.title} bookdata={book.bookData} bookrelease={dateToString(book.release)} ></Bookcover>

    <div className={`book__rightSide ${UIStore.themeClass}`}>
    <p onClick={toggle} className={`book__rightSide--countDown ${UIStore.themeClass}`}>
    <Countdown date={book.release.getTime()} renderer={renderer} />
    </p>
    {viewComments ? (
      <div className={`book__rightSide__messages ${UIStore.themeClass}`}>
        {book.comments.map((comment, index) => (
          <Comment uistore={UIStore} key={`${book.isbn}${comment.date.toString()}${index}`} bookIsbn={book.isbn} commentData={comment}></Comment>
        ))}
      </div>
    ) : (
      <p className={`book__rightSide__description ${UIStore.themeClass}`}>{  (book.bookData) ? book.bookData.volumeInfo.description : ''}</p>
    )}

    {viewComments ? (
      <form onSubmit={e => handleSubmit(e, 'comment', book)} className={`book__rightSide__form ${UIStore.themeClass}`}>
              <input value={book.newCommentField} onChange={e => book.setComment(e.currentTarget.value)} className={`book__rightSide__form--input ${UIStore.themeClass}`} id={`Form${book.isbn}`} name="content" placeholder="Typ een bericht" />
              <div className={`book__rightSide__form--counter ${UIStore.themeClass}`} style={getGradient(book.wordCountPercentage)}>
                <p className={`book__rightSide__form--counter--child ${UIStore.themeClass}`}></p>
              </div>
      </form>
    ) : ('')}

    <div onClick={()=>store.removeBookPost(book) } className={`book__rightSide__check ${UIStore.themeClass}`}>
       <span className={`book__rightSide__check--check hidden ${UIStore.themeClass}`} />
       <span className={`book__rightSide__check--cross ${UIStore.themeClass}`} />
    </div>

    </div>
      <Bookstatus uistore={UIStore} setowned={()=>book.setOwned()} status={book.owned} isbn={book.isbn}></Bookstatus>
      
  </article>



  ));
};

export default Bookpost;
