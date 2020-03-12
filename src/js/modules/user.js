import {decorate} from 'mobx';

class User {

  constructor({name, id}) {
    this.name = name;
    this.id = id;
    this.interactedComments = [];
  }

  linkComment(comment) {
    if(this.interactedComments.includes(comment)) this.interactedComments = this.interactedComments.filter(e => e !== comment)
    this.interactedComments.push(comment);
  }
}

decorate(User, {
});

export default User;
