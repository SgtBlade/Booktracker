import {observable, computed, action, decorate, toJS, autorun} from "mobx";
import googleBookService from "../services/googleBookService";
import BookPost from '../models/BookPost';
import User from '../models/user';
import {Comment} from '../models/comment';
class BookStore {
  constructor(rootStore) {

    this.rootStore = rootStore;
    this.firebase = rootStore.firebase;
    this.dataService = null;
    this.bookPosts = [];
    this.additionField = {
      title: '',
      release: '',
      isbn: ''
    }
    this.searchIsbn = '';
    //this.user = user;
    this.loadFromStorage();

    autorun(() => {
      this.saveToStorage();
    });
  }




  changeBookDate(book) {
    this.bookPosts[this.bookPosts.indexOf(book)].changeRelease(this.additionField.release)
    this.additionField.release = '';
  }

  addbookPost() {
    if(this.additionField.isbn !== '')
    {

      const items = this.bookPosts.filter(bookPost => bookPost.isbn === this.additionField.isbn);
      const newBookPost = new BookPost({
        title: this.additionField.title,
        release: this.additionField.release,
        isbn: this.additionField.isbn,
        image: this.additionField.image,
        originalPoster : this.rootStore.uiStore.currentUser
      });

      if (items.length === 0) {
        this.dataService =  new googleBookService({ onEvent: this.pushToBookPosts, data: newBookPost });
        return {message: 'The book has been added', currentState: true}
      }
      else return {message: 'This book is already in the list', currentState: false}
    }return {message: 'The isbn field is always required', currentState: false}
  } 

  pushToBookPosts = data => {
    this.bookPosts.push(data);
    this.additionField.title = this.additionField.release = this.additionField.image = this.additionField.isbn = '';
  }

  seedbookPosts () {
    const books = [{
        title: 'Harry Potter and the Cursed Child',
        release: '2020-06-13T00:00:00.000Z',
        isbn: '9781338216677'
      },{
        title: 'Stud Muffin',
        release: '2020-03-13T00:00:00.000Z',
        isbn: '9781949202168'
      },{
        title: 'Stud Muffin',
        release: '2020-07-13T00:00:00.000Z',
        isbn: '9780439064866'
      }];
    books.forEach(book => {
      this.setAdditionField('title', book.title);
      this.setAdditionField('release', book.release);
      this.setAdditionField('isbn', book.isbn);
      this.addbookPost();
    })
    this.bookPosts[0].seedComments();
  }

  jestSyncPosts () {
    let posts = []
    const usr = new User({name: 'ThomasWayne', id: 'daw312e9-22e8-43a1-bc3c-830dc9dbbd09'});
    posts.push(new BookPost({
      title: 'Harry Potter and the Cursed Child',
      release: '2020-06-13T00:00:00.000Z',
      isbn: '9781338216677',
      originalPoster: usr,
      store: this
    }))

    posts.push(new BookPost({
      title: 'Stud Muffin',
      release: '2020-03-13T00:00:00.000Z',
      isbn: '9781949202168',
      owned: true,
      originalPoster: usr,
      store: this
    }))
    posts[0].seedComments()
    this.bookPosts =  posts;
  }

  removeBookPost(item) { if(item.originalPoster.id === this.user.id)this.bookPosts.splice(this.bookPosts.indexOf(item), 1); }

  setAdditionField(field, value) { if(field === 'isbn') value = value.replace(/\D/g,''); this.additionField[field] = value; }

  get titleField() { return this.additionField.title; }

  get isbnField() { return this.additionField.isbn; }
  
  get releaseField() { return this.additionField.release; }

  get imageField() { return this.additionField.image; }

  returnBookByIsbn(isbn) {
    this.searchIsbn = isbn;
    const result = this.BookByIsbn;
    this.searchIsbn = '';
    return result;
  }
  
  updateBookData(book) { this.dataService =  new googleBookService({ onEvent: this.pushUpdatedData, data: book , complete: true}); }
  
  pushUpdatedData = data => this.bookPosts[this.bookPosts.indexOf(data)].setBookData(data.bookData);
  
  get BookByIsbn () { return this.bookPosts.find(bookPost => bookPost.isbn === this.searchIsbn); }

  get booksSortedByDate() {
    return this.bookPosts.slice().sort(function(a, b) {
      return a.release.getTime() - b.release.getTime();
    });
  } 

  saveToStorage() { const parsedJson = JSON.stringify(toJS(this.bookPosts)); localStorage.setItem("store", parsedJson); }

  loadFromStorage() {
    const savedStore = localStorage.getItem("store");
    if (savedStore) {
      JSON.parse(savedStore).forEach(item => {
        
        let comments = [];
        item.comments.forEach(comment => {
          comments.push(new Comment({ 
          user: new User({name: comment.user.name, id: comment.user.id}), 
          content: comment.content,
          upvotes: comment.upvotes,
          downvotes: comment.downvotes,
          state: comment.state,
          date: Date(comment.date) }));
        })

        const newBookPost = (
          new BookPost({
            title: item.title,
            release: item.release,
            isbn: item.isbn,
            owned: item.owned,
            image: item.image,
            originalPoster: new User({name: item.originalPoster.name, id: item.originalPoster.id}),
            store: this,
            comments: comments,
            bookData: item.bookData
          }))
        const samePost = this.bookPosts.filter(bookPost => bookPost.isbn === newBookPost.isbn);
        if (samePost.length === 0)this.bookPosts.push(newBookPost)
      })
    }
  };

}

decorate(BookStore, {
  bookPosts: observable,
  pushToBookPosts: action,
  pushUpdatedData: action,
  removeBookPost: action,
  seedbookPosts: action,
  jestSyncPosts: action,
  changeBookDate: action,

  additionField: observable,
  setAdditionField: action,

  titleField: computed,
  isbnField: computed,
  releaseField: computed,

  BookByIsbn: computed,
  booksSortedByDate: computed
});


export default BookStore;