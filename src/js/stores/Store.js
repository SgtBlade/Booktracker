import {observable, computed, action, decorate, configure, toJS} from 'mobx';
import bookPost from '../modules/bookPost';
import User from '../modules/user';
import {Comment} from '../modules/comment';
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
  }

  addbookPost() {
    if(this.additionField.isbn !== '')
    {
      const items = this.bookPosts.filter(bookPost => bookPost.isbn === this.additionField.isbn);
      const newBookPost = new bookPost({
        title: this.additionField.title,
        release: this.additionField.release,
        isbn: this.additionField.isbn,
        originalPoster : this.user,
        store : this
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
    const posts = [];
    posts.push(
      new bookPost({
        title: 'Harry Potter and the Cursed Child',
        release: '2020-06-13T00:00:00.000Z',
        isbn: '9781338216677',
        originalPoster: this.user,
        store: this
      })
    );
    posts[0].seedComments();
    posts.push(
      new bookPost({
        title: 'Stud Muffin',
        release: '2020-03-13T00:00:00.000Z',
        isbn: '9781949202168',
        owned: true,
        originalPoster: this.user,
        store: this
      })
    );
    posts.push(
      new bookPost({
        title: 'Stud Muffin',
        release: '2020-07-13T00:00:00.000Z',
        isbn: '9780439064866',
        owned: true,
        originalPoster: new User({name: 'MiguelDP', id: '6dawd49-41e8-43a1-bc3c-830dc9dbbd09'}),
        store: this
      })
    );
    posts.forEach(post => {if(this.bookPosts.filter(bookPost => bookPost.isbn === post.isbn).length === 0) this.bookPosts.push(post)})

  }

  removeBookPost(item) {
    if(item.originalPoster.id === this.user.id)this.bookPosts.splice(this.bookPosts.indexOf(item), 1);
    this.saveToStorage();
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
      if(typeof a.release === 'string'|| typeof b.release === 'string') {//Wanneer ze van de store komen zijn het strings
        a.release = new Date(a.release)
        b.release = new Date(b.release)
      }
      return a.release.getTime() - b.release.getTime();
    });
  } 

  manualBookpostSort() {
    this.bookPosts.replace(this.bookPosts.slice().sort(function(a, b) {
      return a.release.getTime() - b.release.getTime();
    }));
  }

  saveToStorage() {
    const parsedJson = JSON.stringify(toJS(this.bookPosts));
    localStorage.setItem("store", parsedJson);
  }

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
          new bookPost({
            title: item.title,
            release: new Date(item.release),
            isbn: item.isbn,
            owned: item.owned,
            originalPoster: new User({name: item.originalPoster.name, id: item.originalPoster.id}),
            store: this,
            comments: comments
          }))
        const samePost = this.bookPosts.filter(bookPost => bookPost.isbn === newBookPost.isbn);
        if (samePost.length === 0)this.bookPosts.push(newBookPost)
      })
    }
  };

}

decorate(Store, {
  bookPosts: observable,
  addbookPost: action,
  removeBookPost: action,
  manualBookpostSort: action,

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
