import {observable, computed, action, decorate, configure} from 'mobx';
configure({enforceActions: 'observed'});


class UIStore {
  
  constructor() {
    //this.theme = THEMES.dark;
    this.theme = THEMES.light;
  }

  toggle() {
    console.log(this.theme);
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
  
}

const THEMES = {
  dark: 'dark',
  light: 'light'
};

decorate(UIStore,{
  theme: observable,
  toggle: action,
  themeClass: computed
})
export default UIStore;
