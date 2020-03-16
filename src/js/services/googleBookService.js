import {observable, action, decorate} from 'mobx';
import axios from 'axios';

class googleBookService {
    constructor({ onEvent, data }) {

        this.data = data;
        this.bookData = false;
        this.onEvent = onEvent;
        this.getBookData(this.data.isbn);
    }

    getBookData = async (isbn) => {
        await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
        .then((response) => {
          if(response.data.items)return (this.setBookData(response.data.items[0]));
          else (this.setBookData(false));
        }, (error) => {
          console.log(error);//deze error is normaal enkel bij geen internet
           this.setBookData(false);
        });
      }
    
    setBookData (data) {
        this.bookData = data;
        if(this.data.title === '' && !data) this.data.title = 'No title';
        else if ((this.data.title === '' && data) || (data && this.data.title === 'No title')) this.data.title = this.bookData.volumeInfo.title;
    
        if(data.volumeInfo) {
          if ((this.data.release.toString() === 'Invalid Date' && data.volumeInfo.publishedDate) || ( (new Date()).setHours(0,0,0,0) === this.data.release.setHours(0,0,0,0) && data.volumeInfo.publishedDate))this.data.release = new Date(data.volumeInfo.publishedDate)
          else this.data.release = new Date();
        } else if (this.data.release.toString() === 'Invalid Date') this.data.release = new Date();
        
        this.data.setBookData(this.bookData)
        this.onEvent(this.data)
      }
    
  }


decorate(googleBookService, {
  data: observable,
  setBookData: action
});
  
  export default googleBookService;
  