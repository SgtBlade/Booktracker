import React,{ useContext }  from "react";
import { useObserver } from "mobx-react-lite";
import style from '../../css/compCss/Home.module.css';
import { storeContext } from "../hooks/context";
import Bookpost from "./Bookpost.jsx";
import NewBookForm from "./NewBookForm.jsx";

const Home = () => {
  
  const {store, uiStore} = useContext(storeContext);

  return useObserver (() => (
    <>
    <section className={`${style.books__week} ${style[uiStore.themeClass]}`}>
        <h2 className={`${style.books__week__title} ${style[uiStore.themeClass]} hidden`}>Books</h2>
        {store.booksSortedByDate.map((book) => (
          <Bookpost key={`${book.isbn}`}  book={book}></Bookpost>
        ))}
      <NewBookForm/>
      </section>
    </>
  ));
};

export default Home;
