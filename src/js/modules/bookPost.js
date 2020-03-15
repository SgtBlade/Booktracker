import {observable, action, decorate, configure} from 'mobx';
import axios from 'axios';
import {Comment} from './comment';
import User from './user';

configure({enforceActions: 'observed'});

class bookPost {

  constructor({title, release, isbn, owned = false, bookData = null, originalPoster}) {
    (bookData !== null) ? this.bookData = bookData : this.getBookData(isbn);
    this.title = title;
    this.release = new Date(release);
    this.isbn = isbn;
    this.owned = owned;
    this.comments = [];
    this.originalPoster = originalPoster;
  }

  setOwned() {
    this.owned ? this.owned = false : this.owned = true;
  }

  seedComments() {
    const user = new User({name: 'MiguelDP', id: 1});
    this.comments.push(new Comment({ user: user, content: 'Ah mah gawd I luv dis book' }));
    this.comments.push(new Comment({ user: user, content: 'Cannot wait for this book to get released' }));
    this.comments.push(new Comment({ user: user, content: 'Oooh a new book' }));
    this.comments.push(new Comment({ user: user, content: 'Cool book' }));
  }

  getBookData = async (isbn) => {
    await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
    .then((response) => {
      if(response.data.items)this.setBookData(response.data.items[0]);
      else this.setBookData(false);
    }, (error) => {
      console.log(error);//deze error is normaal enkel bij geen internet
      this.setBookData(false);
    });
  }

  setBookData (data) {
    this.bookData = data;
    if(this.title === '' && !data) this.title = 'No title';
    else if ((this.title === '' && data) || (data && this.title === 'No title')) this.title = this.bookData.volumeInfo.title;

    if (this.release.toString() === 'Invalid Date' && !data) this.release = new Date();
    else if ((this.release.toString() === 'Invalid Date' && data) || ( (new Date()).setHours(0,0,0,0) === this.release.setHours(0,0,0,0) && data) )this.release = new Date(this.bookData.volumeInfo.publishedDate)
  }

  addComment(userData, comment) {
    if (comment.length >= 4)this.comments.push(new Comment({ user: userData, content: comment }))
  }
}

decorate(bookPost, {
  owned: observable,
  setOwned: action,

  comments: observable,
  addComment: action,

  bookData: observable,
  setBookData: action,

  view: observable,
  changeView: action,
});

export default bookPost;