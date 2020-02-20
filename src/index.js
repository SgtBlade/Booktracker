import React from 'react';
import ReactDOM from 'react-dom';
import { useObserver } from "mobx-react-lite";
import './style.css';
import Store from './js/Store';

const store = new Store();

const App = () => {
  
  return useObserver(() => (
    <>
    <h1>testing</h1>
    </>
    ));
}





ReactDOM.render(<App />, document.getElementById('root'));

