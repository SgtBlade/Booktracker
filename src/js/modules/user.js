import {decorate, observable, action} from 'mobx';

class User {

  constructor(user, id) {
    this.name = user;
    this.id = id;
  }
}

decorate(User, {
});

export default User;
