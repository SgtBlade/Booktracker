//Library stuff
import React from 'react';
import { useObserver } from "mobx-react-lite";
//Components
import Bookpost from "./js/comps/Bookpost";
//Styles
import './css/reset.css';
import './css/vars.css';
import './css/style.css';
import './css/light.css';
import './css/responsive.css';
//Classes
import Store from './js/stores/Store';
import UIStore from './js/stores/UIStore.js';


const store = new Store();
const uistore = new UIStore();
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


  const handleSubmit = (e, type, object = null) => {
    e.preventDefault();
    if(type === 'comment')object.addComment(store.user);
    else if(type === 'book')store.addbookPost();
  }

  return useObserver(() => (
    <div className={`contentWrapper ${uistore.themeClass}`}>
    <section className={`books__week ${uistore.themeClass}`}>
        <h2 className={`books__week--title ${uistore.themeClass} hidden`}>Books</h2>
       
        <div className={`theme__toggleButton ${uistore.themeClass}`}>
          Dark mode:
          <input defaultChecked onClick={()=>uistore.toggle()} type="checkbox" id="toggle" />
          <label htmlFor="toggle"></label>
          <div className={`active-circle ${uistore.themeClass}`}></div>
        </div>
        {store.bookPosts.map((book) => (
          <Bookpost uistore={uistore} dateConverter={dateToString} handler={handleSubmit} key={`${book.isbn}`}  bookData={book} store={store}></Bookpost>
        ))}


    <article className={`books__newBook ${uistore.themeClass}`}>
      <h2>New book</h2>
      <form onSubmit={e => handleSubmit(e, 'book')} className={`books__newBook__form ${uistore.themeClass}`}>
        <label className={`books__newBook__form--label ${uistore.themeClass}`} htmlFor="bookTitle">
          Title:
          <input 
          value={store.titleField}
          onChange={e => store.setAdditionField("title", e.currentTarget.value)} 
          className={`book__rightSide__form--input  ${uistore.themeClass}`} name="bookTitle" id="bookTitle" />
          <span className={`books__newBook__form--label--error ${uistore.themeClass} hidden`}>Title is too short or empty</span>
        </label>

        <label className={`books__newBook__form--label ${uistore.themeClass}`} htmlFor="release">
          Release:
          <input
          value={store.releaseField}
          onChange={e => store.setAdditionField("release", e.currentTarget.value)} 
           type="date" className={`book__rightSide__form--input  ${uistore.themeClass}`} name="release" id="release" 
            min={dateToString((new Date(Date.now()+1000*60*60*24)), '-', false)}></input>
            <span className={`books__newBook__form--label--error ${uistore.themeClass} hidden`}>There is an issue with the date</span>
        </label>

        <label className={`books__newBook__form--label ${uistore.themeClass}`} htmlFor="isbn">
          ISBN:
          <input 
          value={store.isbnField} 
          onChange={e => store.setAdditionField("isbn", e.currentTarget.value)} 
          type="text" className={`book__rightSide__form--input  ${uistore.themeClass}`} name="isbn" id="isbn" />
          <span className={`books__newBook__form--label--error ${uistore.themeClass} hidden`}>ISBN not found</span>
        </label>

        <input className={`books__newBook__form--submit ${uistore.themeClass}`} type="submit"></input>
      </form>
    </article>
      </section>
    </div>
  ));
}

export default App;
