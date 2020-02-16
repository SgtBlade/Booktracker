import bookPost from './bookPost';
import {observable, computed, action, decorate, configure} from 'mobx';
configure({enforceActions: 'observed'});

class Store {
  constructor() {
    this.bookPosts = [];
  }

  addbookPost(post) {
    this.bookPosts.push(post);
  }

  get owned() {
    return this.bookPosts.filter(bookPost => bookPost.owned);
  }

  seedbookPosts() {
    this.bookPosts.push(
      new bookPost({
        title: 'Harry Potter and the Cursed Child',
        release: '2020-02-13',
        isbn: '9781338216677'
      })
    );
    this.bookPosts.push(
      new bookPost({
        title: 'Stud Muffin',
        release: '2019-10-22',
        isbn: '9781949202168',
        owned: true
      })
    );
  }
}

decorate(Store, {
  bookPosts: observable,
  addbookPost: action,
  owned: computed
});

export default Store;
