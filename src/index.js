import './style.css';
import { observable, computed, action, decorate } from "mobx";
import Store from './js/Store';
import Message from './js/Message';
import { autorun } from "mobx";
//configure({enforceActions:'observed'});

const handleFormSubmit = (e, store) => {
  e.preventDefault();
  const content = e.currentTarget.content.value;
  if (content) {
    store.addMessage(content);
    e.currentTarget.reset();
    //renderMessages(store);
  }
};

const init = () => {
  const store = new Store();
  autorun(() => {
    renderMessages(store);
    renderUnread(store);
  });
  window.store = store;

};

init();
