import {observable, action, decorate, configure} from 'mobx';
configure({enforceActions: 'observed'});
class Comment {
  constructor({user, content}) {
    this.user = user;
    this.content = content;
    this.upvotes = 0;
    this.downvotes = 0;
    this.date = Date.now();
    this.state = STATE.none;
  } 

  undoVote(vote) {
    if (vote === STATE.downvote) this.downvotes --;
    else if (vote === STATE.upvote) this.upvotes --;
  }

  upvote(user) {
    if (this.state !== STATE.upvote) {//User mag maar 1x voten
      if (this.state === STATE.downvote) this.undoVote(STATE.downvote); //User kan wel voten als vote verschillend is dan vorige
      this.changeState(STATE.upvote); //State van vote veranderen
      this.upvotes ++; //Vote count veranderen
    }
    this.linkVoteToUser(user);
  }

  downvote(user) {
    if (this.state !== STATE.downvote) {//User mag maar 1x voten
      if (this.state === STATE.upvote) this.undoVote(STATE.upvote); //User kan wel voten als vote verschillend is dan vorige
      this.changeState(STATE.downvote); //State van vote veranderen
      this.downvotes ++; //Vote count veranderen
    }
    this.linkVoteToUser(user);
  }

  changeState(newState) {
    this.state = newState;
  }

  linkVoteToUser(user) {
    user.linkComment(this);
  }

}

const STATE = {
  downvote: 'downvote',
  upvote: 'upvote',
  undo: 'undo',
  none: 'none'
};

decorate(Comment, {
  upvotes: observable,
  upvote: action,

  downvotes: observable,
  downvote: action,

  state: observable,
  changeState: action
});

export {Comment, STATE};
