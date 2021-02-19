import React from "react";
import { useObserver } from "mobx-react-lite";
import style from './css/compCss/Home.module.css';
import Bookpost from "./Bookpost.jsx";
import NewBookForm from "./NewBookForm.jsx";
import { useStores } from "../hooks/useStores";

const Home = () => {
  
  const {bookStore, uiStore} = useStores();

  return useObserver (() => (
    <>
    <section className={`${style.books__week} ${style[uiStore.themeClass]}`}>
        <h2 className={`${style.books__week__title} ${style[uiStore.themeClass]} hidden`}>Books</h2>
        {bookStore.booksSortedByDate.map((book) => (
          <Bookpost key={`${book.isbn}`}  book={book}></Bookpost>
        ))}
      <NewBookForm/>
      </section>
    </>
  ));
};

export default Home;
