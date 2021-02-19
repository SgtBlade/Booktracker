import UiStore from "./UiStore";
import BookStore from "./BookStore";
import * as firebase from "firebase/app";
import 'firebase/firestore';

class RootStore {
  constructor() {
    var firebaseConfig = {
      apiKey: process.env.REACT_APP_apiKey,
      authDomain: process.env.REACT_APP_authDomain,
      databaseURL: process.env.REACT_APP_databaseURL,
      projectId: process.env.REACT_APP_projectId,
      storageBucket: process.env.REACT_APP_storageBucket,
      messagingSenderId: process.env.REACT_APP_messagingSenderId,
      appId: process.env.REACT_APP_appId
    };
    // Initialize Firebase
    this.firebase = firebase.initializeApp(firebaseConfig);
    this.initFirebaseCaching();
    this.uiStore = new UiStore(this);
    this.bookStore = new BookStore(this);
  }


  //cache data to lessen requests required
  initFirebaseCaching = () => {
    firebase.firestore().settings({ cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED });
    firebase.firestore().enablePersistence()
      .catch(function(err) {
          if (err.code === 'failed-precondition') {
  
          } else if (err.code === 'unimplemented') {
  
          }
      });
  }

}

const getCurrenTimeStamp = () => {
  return firebase.firestore.Timestamp.now();
};
export { getCurrenTimeStamp };

export default RootStore;
