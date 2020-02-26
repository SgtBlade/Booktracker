import React  from "react";
import { useObserver } from "mobx-react-lite";

const Booklinks = (props) => {
  
    const isbn = props.bookisbn;
    const setOwned = props.setowned;
    const UIStore = props.uistore;
    
  return useObserver(()=>(
    <div className={`book__links ${UIStore.themeClass}`}>
    <a target="_blank" rel="noopener noreferrer" href={`https://www.amazon.com/s?k=${isbn}&ref=nb_sb_noss`}><img src="./assets/icons/amazon.png" alt="Amazon" height={30} width={30} /></a>
    <a target="_blank" rel="noopener noreferrer" href={`https://www.google.be/search?tbm=bks&hl=en&q=${isbn}`}><img src="./assets/icons/goodReads.png" alt="Goodreads" height={30} width={30} /></a>
    <a target="_blank" rel="noopener noreferrer" href={`https://www.goodreads.com/search?q=${isbn}`}><img src="./assets/icons/google.png" alt="Google books" height={30} width={30} /></a>
    <a target="_blank" rel="noopener noreferrer" href={`https://blackwells.co.uk/bookshop/product/${isbn}`}><img src="./assets/icons/blackwells.png" alt="Blackwells books" height={30} width={30} /></a>
    <a target="_blank" rel="noopener noreferrer" href={`https://www.bookfinder.com/search/?author=&title=&lang=en&isbn=${isbn}&new_used=*&destination=be&currency=EUR&mode=basic&st=sr&ac=qr`}><img src="./assets/icons/bookfinder.png " alt="Bookfinder" height={30} width={30} /></a>
    <p onClick={setOwned} className={`book__links--statusUnowned ${UIStore.themeClass}`}>Mark as owned</p>
    </div>
  ));
};

export default Booklinks;
