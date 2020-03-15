import {observable, computed, action, decorate, configure, autorun, toJS} from 'mobx';
import bookPost from '../modules/bookPost';
import User from '../modules/user';
configure({enforceActions: 'observed'});

class Store {
  
  constructor(user = (new User({name: 'MiguelDP', id: '61e58fe9-22e8-43a1-bc3c-830dc9dbbd09'}))) {
    this.bookPosts = [];
    this.additionField = {
      title: '',
      release: '',
      isbn: ''
    }
    this.searchIsbn = '';
    this.user = user;

    this.loadFromStorage();
    autorun(() => {
      this.saveToStorage();
    });
  }

  addbookPost() {
    if(this.additionField.isbn !== '')
    {
      const items = this.bookPosts.filter(bookPost => bookPost.isbn === this.additionField.isbn);
      const newBookPost = new bookPost({
        title: this.additionField.title,
        release: this.additionField.release,
        isbn: this.additionField.isbn,
        originalPoster : this.user
      });

      if (items.length === 0) {
        this.bookPosts.push(newBookPost);
        this.additionField.title = this.additionField.release = this.additionField.isbn = '';
        this.saveToStorage();
        return {message: 'The book has been added', currentState: true}
      }
      else return {message: 'This book is already in the list', currentState: false}
    }return {message: 'The inserted isbn is not valid', currentState: false}
  } 

  seedbookPosts() {
    this.bookPosts.push(
      new bookPost({
        title: 'Harry Potter and the Cursed Child',
        release: '2020-06-13T00:00:00.000Z',
        isbn: '9781338216677',
        originalPoster: this.user
      })
    );
    this.bookPosts[0].seedComments();
    this.bookPosts.push(
      new bookPost({
        title: 'Stud Muffin',
        release: '2020-03-13T00:00:00.000Z',
        isbn: '9781949202168',
        owned: true,
        originalPoster: this.user
      })
    );
    this.bookPosts.push(
      new bookPost({
        title: 'Stud Muffin',
        release: '2020-07-13T00:00:00.000Z',
        isbn: '9780439064866',
        owned: true,
        originalPoster: new User({name: 'MiguelDP', id: '6dawd49-41e8-43a1-bc3c-830dc9dbbd09'})
      })
    );

  }

  removeBookPost(item) {
    if(item.originalPoster.id === this.user.id)this.bookPosts.splice(this.bookPosts.indexOf(item), 1);
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

  get booksSortedByDate() {
    return this.bookPosts.slice().sort(function(a, b) {
      return a.release.getTime() - b.release.getTime();
    });
  } 

  saveToStorage() {
    const parsedJson = JSON.stringify(toJS(this.bookPosts));
    localStorage.setItem("store", parsedJson);
  }

  loadFromStorage() {
    const savedStore = localStorage.getItem("store");
    if (savedStore && savedStore.includes('bookpost')) {//de saved store was [] waardoor hij dacht dat het gebruikt werd en dus gaf hij error
      this.bookPosts = JSON.parse(savedStore);
      console.log(this.bookPosts)
    }
  };

}

decorate(Store, {
  bookPosts: observable,
  addbookPost: action,
  removeBookPost: action,

  additionField: observable,
  setAdditionField: action,

  saveToStorage: action,

  titleField: computed,
  isbnField: computed,
  releaseField: computed,
  BookByIsbn: computed,
  booksSortedByDate: computed
});

export default Store;
