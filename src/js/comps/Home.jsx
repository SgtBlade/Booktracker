import React,{ useContext }  from "react";
import { useObserver } from "mobx-react-lite";
import style from '../../css/compCss/Home.module.css';
import { storeContext } from "../hooks/context";
import Bookpost from "./Bookpost.jsx";
import NewBookForm from "./NewBookForm.jsx";
import {useHistory} from "react-router-dom";
import {ROUTES} from '../consts/routes.js';

const Home = () => {
  
  const {store, uiStore} = useContext(storeContext);

  let holButtonTimer;
  let history = useHistory();
  console.log(localStorage.getItem("store")[0])

  const mouseDown = (e, id) => {
    if(document.activeElement.nodeName !== 'INPUT')holButtonTimer = setTimeout(() => history.push(`${ROUTES.detail.to}${id}`), 400);
  }
  
  const mouseUp = () => { 
    clearTimeout(holButtonTimer);
  }

  return useObserver (() => (
    <>
    <section onMouseUp={e => mouseUp(e)}  className={`${style.books__week} ${style[uiStore.themeClass]}`}>
        <h2 className={`${style.books__week__title} ${style[uiStore.themeClass]} hidden`}>Books</h2>
        {store.booksSortedByDate.map((book) => (
          <Bookpost onMouseDown={(e, id) => mouseDown(e, id)}  key={`${book.isbn}`}  book={book}></Bookpost>
        ))}
      <NewBookForm/>
      </section>
    </>
  ));
};

export default Home;
