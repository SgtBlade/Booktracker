import bookPost from './bookPost';
import {observable, computed, action, decorate, configure} from 'mobx';
configure({enforceActions: 'observed'});

class Store {
  
  constructor() {
    this.bookPosts = [];
  }

  addbookPost(element) {
    element.preventDefault();
    if(element.currentTarget.isbn.value !== '')
    {
      const bookTitle = element.currentTarget.bookTitle.value;
      const bookDate = element.currentTarget.release.value;
      let bookISBN = element.currentTarget.isbn.value;
  
      this.bookPosts.push(
        new bookPost({
          title: bookTitle,
          release: bookDate,
          isbn: bookISBN
        })
      );
    element.currentTarget.reset()
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
  
}

decorate(Store, {
  bookPosts: observable,
  addbookPost: action,
  owned: computed,
  removeBookPost: action
});

export default Store;
