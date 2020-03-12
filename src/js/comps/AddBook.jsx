import React,{ useContext,useState }  from "react";
import { useObserver } from "mobx-react-lite";
import style from '../../css/compCss/AddBook.module.css';
import { storeContext } from "../hooks/context";
import Returnbutton from './Returnbutton.jsx';
import SystemMessage from './SystemMessage';

const AddBook = () => {

  const {store, uiStore} = useContext(storeContext);
  const [addState, setState] = useState(undefined);

  const handleSubmit = (e) => {
    e.preventDefault();
    let successfullAdd = store.addbookPost();
    setState(successfullAdd);
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
    <article className={`${style.formAtricle} ${uiStore.themeClass}`}>
    <Returnbutton/>
    {addState === false ? <SystemMessage positiveMessage={false} warningMessage={`This book is already in your list`}/> 
    : (addState === true) ? <SystemMessage positiveMessage={true} warningMessage={`The book has been added`}/>  : ''}

      <form className={`${style.form} ${uiStore.themeClass}`} onSubmit={e => handleSubmit(e)}>
        <fieldset className={`${style.form__fieldset} ${uiStore.themeClass}`}>
          <legend className={`${style.form__legend} ${uiStore.themeClass}`}>Add a new book to the list</legend>
          <label className={`${style.form__label} ${uiStore.themeClass}`} htmlFor="bookTitle">
          <p>Book title:</p>
          <input 
          className={`${style.form__input} ${uiStore.themeClass}`}
          value={store.titleField}
          onChange={e => store.setAdditionField("title", e.currentTarget.value)} 
          name="bookTitle" id="bookTitle" /></label>

      <label className={`${style.form__label} ${uiStore.themeClass}`} htmlFor="release">
        <p>Book release date:</p>
      <input 
          className={`${style.form__input} ${uiStore.themeClass}`}
          value={store.releaseField}
          onChange={e => store.setAdditionField("release", e.currentTarget.value)} 
           type="date" name="release" id="release" 
            min={dateToString((new Date(Date.now()+1000*60*60*24)), '-', false)}/></label>

      <label className={`${style.form__label} ${uiStore.themeClass}`} htmlFor="isbn">
        <p className={`${style.form__label__text} ${uiStore.themeClass}`}>Book isbn number <span className={`${style.form__label__note} ${uiStore.themeClass}`}>required</span></p>
      <input 
          className={`${style.form__input} ${uiStore.themeClass}`}
          value={store.isbnField} 
          onChange={e => store.setAdditionField("isbn", e.currentTarget.value)} 
          type="text" name="isbn" id="isbn" /></label>
        </fieldset>
      
        <input className={`${style.form__submit} ${style[uiStore.themeClass]}`} type="submit" value={`Add book`}/>
      </form>
      </article>
  ));
};

export default AddBook;
