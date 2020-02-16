import {observable, action, decorate, configure} from 'mobx';
configure({enforceActions: 'observed'});
class bookPost {
  constructor({title, release, isbn, owned = false}) {
    this.title = title;
    this.release = release;
    this.isbn = isbn;
    this.owned = owned;
    this.comments = [];
  }

  setOwned() {
    this.owned = true;
  }
}

decorate(bookPost, {
  owned: observable,
  setOwned: action
});

export default bookPost;
