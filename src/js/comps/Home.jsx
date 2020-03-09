import React,{ useContext }  from "react";
import { useObserver } from "mobx-react-lite";
import style from '../../css/compCss/Home.module.css';
import { storeContext } from "../stores/context";
import Bookpost from "./Bookpost.jsx";
import NewBook from "./NewBook.jsx";
import {useHistory} from "react-router-dom";

const Home = () => {
  
  const {store, uiStore} = useContext(storeContext);

  let holButtonTimer;
  let history = useHistory();
  const mouseDown = (e, id) => holButtonTimer = setTimeout(() => history.push(`/detail/${id}`), 400);
  
  const mouseUp = () => { 
    clearTimeout(holButtonTimer);
  }


  return useObserver (() => (
    <>
    <section onMouseUp={e => mouseUp(e)}  className={`${style.books__week} ${style[uiStore.themeClass]}`}>
        <h2 className={`${style.books__week__title} ${style[uiStore.themeClass]} hidden`}>Books</h2>
        {store.bookPosts.map((book) => (
          <Bookpost onMouseDown={(e, id) => mouseDown(e, id)}  key={`${book.isbn}`}  bookData={book}></Bookpost>
        ))}
      <NewBook/>
      </section>
    </>
  ));
};

export default Home;
