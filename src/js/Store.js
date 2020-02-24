import bookPost from './bookPost';
import {observable, computed, action, decorate, configure} from 'mobx';
configure({enforceActions: 'observed'});

class Store {
  
  constructor() {
    this.bookPosts = [];
    this.additionField = {
      title: '',
      release: '',
      isbn: ''
    }
  }

  addbookPost(element) {
    element.preventDefault();
    if(this.additionField.isbn !== '')
    {
      this.bookPosts.push(
        new bookPost({
          title: this.additionField.title,
          release: this.additionField.release,
          isbn: this.additionField.isbn
        })
      );
      this.additionField.title = this.additionField.release = this.additionField.isbn = '';
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
        isbn: '9781338216677'
      })
    );
    this.bookPosts[0].seedComments();
    this.bookPosts.push(
      new bookPost({
        title: 'Stud Muffin',
        release: '2020-03-13T00:00:00.000Z',
        isbn: '9781949202168',
        owned: true
      })
    );

  }

  removeBookPost(item) {
    this.bookPosts.splice(this.bookPosts.indexOf(item), 1);
  }

  setAdditionField(field, value) {
    if(value === 'isbn') value = value.replace(/\D/g,'');
    this.additionField[field] = value;
    console.log(value);
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
  releaseField: computed
});

export default Store;
