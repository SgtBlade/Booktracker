import React  from "react";
import { useObserver } from "mobx-react-lite";

const Bookcover = (props) => {
  
    const isbn = props.bookisbn;
    const data = props.bookdata;
    const title = props.booktitle;
    const release = props.bookrelease;
    const UIStore = props.uistore;
    
  return useObserver (() => (
    <div className={`book__leftSide ${UIStore.themeClass}`} onClick={() => {navigator.clipboard.writeText(isbn)}}>
      <img className={`book__leftSide--image ${UIStore.themeClass}`} src={  (data) ? data.volumeInfo.imageLinks.thumbnail : './assets/img/placeholder.jpg'} alt={title + ' image'} height="300" width="200" />
      <div className={`book__leftSite--hover ${UIStore.themeClass}`} />
      <div className={`book__leftSide--info ${UIStore.themeClass}`}>
        <h2>{title}</h2>
        <p>{release}</p>
      </div>
    </div>
  ));
};

export default Bookcover;
