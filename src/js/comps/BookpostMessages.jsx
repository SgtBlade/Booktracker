import React, { useState, useContext}  from "react";
import PropTypes from "prop-types";
import { useObserver } from "mobx-react-lite";
import Comment from "./Comment.jsx";
import style from '../../css/compCss/BookpostMessages.module.css';
import { storeContext } from "../stores/context";


const BookpostMessages = ({bookData}) => {

  const {store, uiStore} = useContext(storeContext);
  const stringLimit = 156; 

  const [commentText, setCommentText] = useState('');
  const handleInput = (value) => {
    if(value.length > stringLimit) setCommentText(value.substring(0, stringLimit));
    else setCommentText(value);
  }

  const handleSubmit = (e, book) => {
    e.preventDefault();
    book.addComment(store.user, commentText);
    if(commentText.length >= 4 )setCommentText('');
  }

  const getGradient = () => { 
    const count = Math.floor((commentText.length/stringLimit)*100);
    return {backgroundImage: `${(uiStore.theme === 'light')? 'conic-gradient(rgb(151,179,213)' : 'conic-gradient(rgb(224, 127, 0)'}  ${count}%, #696caa ${count}%)`} 
  }
    
  return useObserver(() => (
      <>
      <div className={`${style.book__rightSide__messages} ${style[uiStore.themeClass]}`}>
        {bookData.comments.map((comment, index) => ( 
          <Comment key={`${bookData.isbn}${comment.date.toString()}${index}`} bookIsbn={bookData.isbn} commentData={comment}></Comment>
        ))}
      </div>
      <form onSubmit={e => handleSubmit(e, bookData)} className={`${style.book__rightSide__form} ${style[uiStore.themeClass]}`}>
        <input value={commentText} onChange={e => handleInput(e.currentTarget.value)} className={`${style.book__rightSide__form__input} ${style[uiStore.themeClass]}`} id={`Form${bookData.isbn}`} name="content" placeholder="Typ een bericht" />
        <div className={`${style.book__rightSide__form__counter} ${style[uiStore.themeClass]}`} style={getGradient(bookData.wordCountPercentage)}>
          <p className={`${style.book__rightSide__form__counter__child} ${style[uiStore.themeClass]}`}></p>
        </div>
      </form>
      </>
  ));
};
BookpostMessages.propTypes = {
  bookData: PropTypes.object.isRequired
};

export default BookpostMessages;
