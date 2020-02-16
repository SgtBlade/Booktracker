import { observable, action, decorate, configure, computed } from 'mobx';
configure({ enforceActions: 'observed' });
class comment {
  constructor({ user, userID, content, rating }) {
    this.user = user;
    this.userID = userID;
    this.content = content;
    this.rating = rating;
    this.upvotes = 0;
    this.downvotes = 0;
    this.date = Date.now();
    this.state = 'none';
  }

  upvote() {
    if (this.state === 'UNDO') {
      this.upvotes --;
    } else {
      if (this.state === 'downvote') {
        this.changeState('UNDO');
        this.downvote();
      }
      this.changeState('upvote');
      this.upvotes ++;
    }
  }

  downvote() {
    if (this.state === 'UNDO') {
      this.downvotes --;
    } else {
      if (this.state === 'upvote') {
        this.changeState('UNDO');
        this.upvote();
      }
      this.changeState('downvote');
      this.downvotes ++;
    }
  }

  changeState(state) {
    this.state = state;
  }
}

decorate(comment, {
  upvotes: observable,
  upvote: action,

  downvotes: observable,
  downvote: action,

  state: observable
});

export default comment;
