import React, { useState, useRef, useEffect}  from "react";
import { useStores } from "../hooks/useStores";
import PropTypes from "prop-types";
import { useObserver } from "mobx-react-lite";
import Comment from "./Comment.jsx";
import style from './css/compCss/BookpostMessages.module.css';


const BookpostMessages = ({book}) => {
  
  const commentBox = useRef(null);
  const {bookStore, uiStore} = useStores();
  const stringLimit = 156;
  const [commentText, setCommentText] = useState('');

  const handleInput = (value) => {
    if(value.length > stringLimit) setCommentText(value.substring(0, stringLimit));
    else setCommentText(value);
  }

  const handleSubmit = (e, book) => {
    e.preventDefault();
    book.addComment(bookStore.user, commentText);
    if(commentText.length >= 4 ){setCommentText('');};
  }
  
  const handleFocus = (e) => (e.currentTarget.closest('article')).scrollIntoView({ block: 'center',behavior: "smooth" })//Vond geen andere manier om parent te accessen, sorry
  
  const getGradient = () => { 
    const count = Math.floor((commentText.length/stringLimit)*100);
    return {backgroundImage: `${(uiStore.theme === 'light')? 'conic-gradient(rgb(151,179,213)' : 'conic-gradient(rgb(224, 127, 0)'}  ${count}%, #696caa ${count}%)`} 
  }


  useEffect(() => { commentBox.current.scrollTop = (commentBox.current.scrollHeight - commentBox.current.clientHeight); })

  return useObserver(() => (
      <>

      <div ref={commentBox} className={`${style.book__rightSide__messages} ${style[uiStore.themeClass]}`} >
        {book.comments.map((comment, index) => ( 
          <Comment key={`${book.isbn}${comment.date.toString()}${index}`} commentData={comment}/>
        ))}
      </div>

      <form onSubmit={e => handleSubmit(e, book)} className={`${style.book__rightSide__form} ${style[uiStore.themeClass]}`}>
        <input onFocus={ e => handleFocus(e) }  value={commentText} onChange={e => handleInput(e.currentTarget.value)} className={`${style.book__rightSide__form__input} ${style[uiStore.themeClass]}`} id={`Form${book.isbn}`} name="content" placeholder="Typ een bericht" />
        <div className={`${style.book__rightSide__form__counter} ${style[uiStore.themeClass]}`} style={getGradient(book.wordCountPercentage)}>
          <p className={`${style.book__rightSide__form__counter__child} ${style[uiStore.themeClass]}`}></p>
        </div>
      </form>

      </>
  ));
};
BookpostMessages.propTypes = {
  book: PropTypes.object.isRequired
};

export default BookpostMessages;
