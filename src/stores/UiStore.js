import {observable, computed, action, decorate} from 'mobx';
import User from '../models/user';
import AuthService from "../services/AuthenticationService";

class UiStore {
  
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.firebase = rootStore.firebase;
    this.authService = new AuthService( this.rootStore.firebase, this.onAuthStateChanged);
    this.theme = THEMES.dark;
    this.currentUser = new User({name: 'MiguelDP', id: 1});
  }

  toggle() {
    (this.theme === THEMES.light) ? (this.theme = THEMES.dark) : (this.theme = THEMES.light);
  }

  get themeClass() {
    switch(this.theme) {
      case THEMES.dark : 
        return '';
      case THEMES.light:
        return 'lightMode';
      default : 
        return '';
    }
  }

  onAuthStateChanged = async user => {
    if (user) {
      console.log('--------------')
      console.log('User auth changed')
      console.log(user)
      //If there's no current user, set a new user
      if(!this.currentUser){this.setCurrentUser(user.uid);console.log('getting user')}
      console.log('--------------')
    }
  };

}

const THEMES = {
  dark: 'dark',
  light: 'light'
};

decorate(UiStore, {
  currentUser: observable,
  onAuthStateChanged: action,
  theme: observable,
  toggle: action,
  themeClass: computed
});

export default UiStore;