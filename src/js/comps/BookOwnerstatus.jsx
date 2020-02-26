import React  from "react";
import { useObserver } from "mobx-react-lite";
import Booklinks from "./Booklinks";

const BookOwnerStatus = (props) => {
  
    const status = props.status;
    const setOwned = props.setowned;
    const isbn = props.isbn;
    const UIStore = props.uistore;
    
  return useObserver(()=>(
      <>
    {status ? (
        <div onClick={setOwned } className={`book__links book__links--owned ${UIStore.themeClass}`}>
          <p className={`book__links--statusOwned ${UIStore.themeClass}`}>owned</p>
        </div>
          ) 
          : (
            <Booklinks uistore={UIStore} bookisbn={isbn} setowned={setOwned}></Booklinks>
          )}
        </>

  ));
};

export default BookOwnerStatus;
