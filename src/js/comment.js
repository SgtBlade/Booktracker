import { observable, action, decorate,configure  } from "mobx";
configure({enforceActions:'observed'});
class comment {

  constructor({user, userID, content, rating}) {

    this.user = user;
    this.userID = userID;
    this.content = content
    this.rating = rating
    this.upvotes = 0;
    this.downvotes = 0;
    this.date = Date.now();
    this.state = 'none'
  }

  upvote() {
    this.upvotes++;
    if (this.state === 'downvote') this.downvote--; 
    this.state === 'upvote';
  }

  downvote() {
    this.downvotes++;
    if (this.state === 'upvote') this.upvotes--; 
    this.state === 'downvote';
  }

  get GetState() {
    return this.state;
  }

  get upvoteCount() {
    return this.upvotes;
  }

  get downvoteCount() {
    return this.upvotes;
  }
}

decorate(comment, {
  upvotes: observable,
  upvote: action,
  downvotes: observable,
  downvote: action,
  state: observable,
  GetState : computed,
  upvoteCount : computed,
  downvoteCount : computed
})

export default comment;
