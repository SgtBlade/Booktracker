import React from "react";
import { useStores } from "../hooks/useStores";
import PropTypes from "prop-types";
import { useObserver } from "mobx-react-lite";
import style from './css/compCss/Booklinks.module.css';

const Booklinks = ({bookisbn, setowned}) => {
  
  const {uiStore} = useStores();
    
  return useObserver(()=>(
    <div className={`${style.book__links} ${style[uiStore.themeClass]}`}>
    <a target="_blank" rel="noopener noreferrer" href={`https://www.amazon.com/s?k=${bookisbn}&ref=nb_sb_noss`}><img src="/assets/icons/amazon.png" alt="Amazon" height={30} width={30} /></a>
    <a target="_blank" rel="noopener noreferrer" href={`https://www.google.be/search?tbm=bks&hl=en&q=${bookisbn}`}><img src="/assets/icons/google.png" alt="Goodreads" height={30} width={30} /></a>
    <a target="_blank" rel="noopener noreferrer" href={`https://www.goodreads.com/search?q=${bookisbn}`}><img src="/assets/icons/goodReads.png" alt="Google books" height={30} width={30} /></a>
    <a target="_blank" rel="noopener noreferrer" href={`https://blackwells.co.uk/bookshop/product/${bookisbn}`}><img src="/assets/icons/blackwells.png" alt="Blackwells books" height={30} width={30} /></a>
    <a target="_blank" rel="noopener noreferrer" href={`https://www.bookfinder.com/search/?author=&title=&lang=en&isbn=${bookisbn}&new_used=*&destination=be&currency=EUR&mode=basic&st=sr&ac=qr`}><img src="/assets/icons/bookfinder.png " alt="Bookfinder" height={30} width={30} /></a>
    <p onClick={setowned} className={`${style.book__links__statusUnowned} ${style[uiStore.themeClass]}`}>Mark as owned</p>
    </div>
  ));
};
Booklinks.propTypes = {
  setowned: PropTypes.func.isRequired,
  bookisbn: PropTypes.string.isRequired
};

export default Booklinks;
