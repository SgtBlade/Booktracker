import bookPost from '../modules/bookPost';
import {observable, computed, action, decorate, configure} from 'mobx';
import User from '../modules/user';
configure({enforceActions: 'observed'});

class Store {
  
  constructor() {
    this.bookPosts = [];
    this.additionField = {
      title: '',
      release: '',
      isbn: ''
    }
    this.searchIsbn = '';
    this.user = new User('MiguelDP', 1);

  }

  addbookPost() {
    if(this.additionField.isbn !== '')
    {
      const items = this.bookPosts.filter(bookPost => bookPost.isbn === this.additionField.isbn);
      const newBookPost = new bookPost({
        title: this.additionField.title,
        release: this.additionField.release,
        isbn: this.additionField.isbn
      });

      let returnState = true;
      if (items.length === 0) this.bookPosts.push(newBookPost);
      else returnState = false
      this.additionField.title = this.additionField.release = this.additionField.isbn = '';
      return returnState;
    }
  }

  get owned() {
    return this.bookPosts.filter(bookPost => bookPost.owned);
  }

  seedbookPosts() {
    this.bookPosts.push(
      new bookPost({
        title: 'Harry Potter and the Cursed Child',
        release: '2020-06-13T00:00:00.000Z',
        isbn: '9781338216677',
        user: this.user
      })
    );
    this.bookPosts[0].seedComments();
    this.bookPosts.push(
      new bookPost({
        title: 'Stud Muffin',
        release: '2020-03-13T00:00:00.000Z',
        isbn: '9781949202168',
        owned: true,
        user: this.user
      })
    );

  }

  removeBookPost(item) {
    this.bookPosts.splice(this.bookPosts.indexOf(item), 1);
  }

  setAdditionField(field, value) {
    if(field === 'isbn') value = value.replace(/\D/g,'');
    this.additionField[field] = value;
  }

  get titleField() {
    return this.additionField.title;
  }

  get isbnField() {
    return this.additionField.isbn;
  }
  
  get releaseField() {
    return this.additionField.release;
  }

  returnBookByIsbn(isbn) {
    this.searchIsbn = isbn;
    const result = this.BookByIsbn;
    this.searchIsbn = '';
    return result;
  }
  
  get BookByIsbn () {
    return this.bookPosts.find(bookPost => bookPost.isbn === this.searchIsbn);
  }
}

decorate(Store, {
  bookPosts: observable,
  addbookPost: action,
  owned: computed,
  removeBookPost: action,

  additionField: observable,
  setAdditionField: action,
  titleField: computed,
  isbnField: computed,
  releaseField: computed,
  BookByIsbn: computed
});

export default Store;
