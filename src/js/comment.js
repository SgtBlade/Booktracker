import {observable, action, decorate, configure} from 'mobx';
configure({enforceActions: 'observed'});
class comment {
  constructor({user, userID, content, rating = null}) {
    this.user = user;
    this.userID = userID;
    this.content = content;
    this.rating = rating;
    this.upvotes = 0;
    this.downvotes = 0;
    this.date = Date.now();
    this.state = STATE.none;
  }

  undoVote(vote) {
    if (vote === STATE.downvote) this.downvotes --;
    else if (vote === STATE.upvote) this.upvotes --;
  }

  upvote() {
    if (this.state !== STATE.upvote) {//User mag maar 1x voten
      if (this.state === STATE.downvote) this.undoVote(STATE.downvote); //User kan wel voten als vote verschillend is dan vorige
      this.changeState(STATE.upvote); //State van vote veranderen
      this.upvotes ++; //Vote count veranderen
    }
  }

  downvote() {
    if (this.state !== STATE.downvote) {//User mag maar 1x voten
      if (this.state === STATE.upvote) this.undoVote(STATE.upvote); //User kan wel voten als vote verschillend is dan vorige
      this.changeState(STATE.downvote); //State van vote veranderen
      this.downvotes ++; //Vote count veranderen
    }
  }

  changeState(newState) {
    this.state = newState;
  }

}

const STATE = {
  downvote: 'downvote',
  upvote: 'upvote',
  undo: 'undo',
  none: 'none'
};

decorate(comment, {
  upvotes: observable,
  upvote: action,

  downvotes: observable,
  downvote: action,

  state: observable,
  changeState: action
});

export {comment, STATE};
