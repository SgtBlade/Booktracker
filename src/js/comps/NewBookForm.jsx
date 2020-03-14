import React,{ useContext }  from "react";
import { useObserver } from "mobx-react-lite";
import style from '../../css/compCss/NewBookForm.module.css';
import { storeContext } from "../hooks/context";

const NewBookForm = () => {

  const {store, uiStore} = useContext(storeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    store.addbookPost();
  }
 
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
    <article className={`${style.books__newBook} ${style[uiStore.themeClass]}`}>
      <h2>New book</h2>
      <form onSubmit={e => handleSubmit(e)} className={`${style.books__newBook__form} ${style[uiStore.themeClass]}`}>
        <label className={`${style.books__newBook__form__label} ${style[uiStore.themeClass]}`} htmlFor="bookTitle">
          Title:
          <input 
          value={store.titleField}
          onChange={e => store.setAdditionField("title", e.currentTarget.value)} 
          className={`${style.book__rightSide__form__input}  ${style[uiStore.themeClass]}`} name="bookTitle" id="bookTitle" />
          <span className={`${style.books__newBook__form__label__error} ${style[uiStore.themeClass]} hidden`}>Title is too short or empty</span>
        </label>

        <label className={`${style.books__newBook__form__label} ${style[uiStore.themeClass]}`} htmlFor="release">
          Release:
          <input 
          value={store.releaseField}
          onChange={e => store.setAdditionField("release", e.currentTarget.value)} 
           type="date" className={`${style.book__rightSide__form__input}  ${style[uiStore.themeClass]}`} name="release" id="release" 
            min={dateToString((new Date(Date.now()+1000*60*60*24)), '-', false)}></input>
            <span className={`${style.books__newBook__form__label__error} ${style[uiStore.themeClass]} hidden`}>There is an issue with the date</span>
        </label>

        <label className={`${style.books__newBook__form__label} ${style[uiStore.themeClass]}`} htmlFor="isbn">
          ISBN:
          <input 
          value={store.isbnField} 
          onChange={e => store.setAdditionField("isbn", e.currentTarget.value)} 
          type="text" className={`${style.book__rightSide__form__input}  ${style[uiStore.themeClass]}`} name="isbn" id="isbn" />
          <span className={`${style.books__newBook__form__label__error} ${style[uiStore.themeClass]} hidden`}>ISBN not found</span>
        </label>

        <input className={`${style.books__newBook__form__submit} ${style[uiStore.themeClass]}`} type="submit"></input>
      </form>
    </article>
  ));
};

export default NewBookForm;
