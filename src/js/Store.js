import bookPost from './bookPost';
import {observable, computed, action, decorate, configure} from 'mobx';
configure({enforceActions: 'observed'});

class Store {
  constructor() {
    this.bookPosts = [];
  }

  addbookPost(element) {
    element.preventDefault();
    const bookTitle = element.currentTarget.bookTitle.value;
    const bookDate = element.currentTarget.release.value;
    const bookISBN = element.currentTarget.isbn.value;

    this.bookPosts.push(
      new bookPost({
        title: bookTitle,
        release: bookDate,
        isbn: bookISBN
      })
    );
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

  addCommentToBookpost(book, element) {
    element.preventDefault();
    const content = element.currentTarget.content.value;
    element.currentTarget.content.value = '';
    if (content.length >= 4) this.bookPosts[this.bookPosts.indexOf(book)].addComment({message: content});
  }
  
}

decorate(Store, {
  bookPosts: observable,
  addbookPost: action,
  owned: computed,
  removeBookPost: action
});

export default Store;
