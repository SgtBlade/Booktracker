import {observable, action, decorate, configure, computed} from 'mobx';
import axios from 'axios';
import {comment} from './comment';
configure({enforceActions: 'observed'});

const VIEWSTATE = {
  comments: 'comments',
  description: 'description'
};
class bookPost {

  constructor({title, release, isbn, owned = false, bookData = null}) {
    (bookData !== null) ? this.bookData = bookData : this.getBookData(isbn);
    this.title = title;
    this.release = new Date(release);
    this.isbn = isbn;
    this.owned = owned;
    this.view = VIEWSTATE.comments;
    this.newComment = '';
    this.stringLimit = 156;
    this.comments = [];
  }

  setOwned() {
    this.owned ? this.owned = false : this.owned = true;
  }

  seedComments() {
    this.comments.push(new comment({ user: 'Pikachu99', userID: 4124, content: 'Ah mah gawd I luv dis book' }));
    this.comments.push(new comment({ user: 'Whopper', userID: 213, content: 'Cannot wait for this book to get released' }));
    this.comments.push(new comment({ user: 'PokePotter', userID: 2134, content: 'Oooh a new book' }));
    this.comments.push(new comment({ user: 'PokePotter', userID: 2134, content: 'Cool book' }));
  }

  getBookData = async (isbn) => {
    await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
    .then((response) => {
      if(response.data.items)this.setBookData(response.data.items[0]);
      else this.setBookData(false);
    }, (error) => {
      console.log(error);
    });
    
  }

  setBookData (data) {
    this.bookData = data;
    if(this.title === '' && !data) this.title = 'No title';
    else if (this.title === '') this.title = this.bookData.volumeInfo.title
    if (this.release.toString() === 'Invalid Date' && !data) this.release = new Date();
    else if (this.release.toString() === 'Invalid Date')this.release = new Date(this.bookData.volumeInfo.publishedDate)
  }

  addComment() {
    if (this.newComment.length >= 4){
      this.comments.push(new comment({ user: 'Pikachu99', userID: (Math.random()*10000), content: this.newComment }))
      this.newComment = '';
    } 
  }

  changeView() {
    this.view === VIEWSTATE.comments ? this.view = VIEWSTATE.description : this.view = VIEWSTATE.comments;
  }

  get wordCountPercentage() {
    return Math.floor((this.newComment.length/this.stringLimit)*100);
  }

  get newCommentField() {
    return this.newComment;
  }

  setComment(value) {
    if(value.length > this.stringLimit) this.newComment = value.substring(0, this.stringLimit);
    else this.newComment = value;
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

  newComment: observable,
  setComment: action,
  wordCountPercentage: computed,
  newCommentField: computed

});

export default bookPost;
export {VIEWSTATE}