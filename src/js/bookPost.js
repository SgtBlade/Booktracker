import {observable, action, decorate, configure, computed} from 'mobx';
import axios from 'axios';
import {comment} from './comment';
configure({enforceActions: 'observed'});
class bookPost {
  constructor({title, release, isbn, owned = false, bookData = null}) {
    (bookData !== null) ? this.bookData = bookData : this.getBookData(isbn);
    this.title = title;
    this.release = new Date(release);
    this.isbn = isbn;
    this.owned = owned;
    this.comments = [];
    

  }

  setOwned() {
    this.owned ? this.owned = false : this.owned = true;
  }

  seedComments() {
    this.comments.push(new comment({ user: 'Pikachu99', userID: 4124, content: 'Ah mah gawd I luv dis book' }));
    this.comments.push(new comment({ user: 'Whopper', userID: 213, content: 'Cannot wait for this book to get released' }));
    this.comments.push(new comment({ user: 'PokePotter', userID: 2134, content: 'Oooh a new book' }));
    this.comments.push(new comment({ user: 'PokePotter', userID: 2134, content: 'Cool book' }));
  }

  getBopookData = async isbn => {

    /*let data = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
    .then(response => response.json());
    //.then(responseObject => responseObject.data);
    
    const test = await data;
    return (await test);
    
    //voorbeeld string voor als jullie het json willen zien
    //https://www.googleapis.com/books/v1/volumes?q=isbn:9781949202168

    /*
    let data = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
    .then(result => result.json())
    .then(data => {return data.items[0]});
    return data;
    */
  }

  
  getBookData = async (isbn) => {
    await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
    .then((response) => {
      this.setBookData(response.data.items[0]);
    }, (error) => {
      console.log(error);
    });
    
  }

  setBookData (data) {
    this.bookData = data;
    if(this.title === '') this.title = this.bookData.volumeInfo.title;
    if (this.release.toString() === 'Invalid Date') this.release = new Date(this.bookData.volumeInfo.publishedDate) 
  }

  addComment({message}) {
    this.comments.push(new comment({ user: 'Pikachu99', userID: (Math.random()*10000), content: message }))
  }

}

decorate(bookPost, {
  owned: observable,
  setOwned: action,
  comments: observable,
  addComment: action,
  bookData: observable,
  setBookData: action
});

export default bookPost;

/*
kind: "books#volume"
id: "OayBxwEACAAJ"
etag: "9GbJuVel1OU"
selfLink: "https://www.googleapis.com/books/v1/volumes/OayBxwEACAAJ"
volumeInfo:
title: "Stud Muffin"
authors: (2) ["Smartypants Romance", "Jiffy Kate"]
publishedDate: "2019-10-22"
description: "It's hard to get revenge without getting a rap sheet. After Tempest Cassidy walks in on her husband banging her high school nemesis, her whole world gets turned upside down. She goes from being known as the Duchess of Muffins to the town crazy. Her new MO: revenge. Eventually, Tempest grows weary being arrested. Yet what choice does she have? If she's not angry, then she's simply . . . sad. Just as she decides to get her life back on track, in walks Cage Erickson, the new bouncer at the local strip club. He's scary-handsome and the polar opposite of her ex. She's attracted to him, but she's not looking for a rebound. He's attracted to her, but he's not looking for a serious relationship. So, they agree to be friends. But when lines get blurred in the friend zone, will they both get burned? Or will it be a TKO? 'Stud Muffin' is a full-length contemporary romantic comedy, can be read as a standalone, and is book#2 in the Donner Bakery series, Green Valley World, Penny Reid Book Universe."
industryIdentifiers: (2) [{…}, {…}]
readingModes: {text: false, image: false}
pageCount: 302
printType: "BOOK"
categories: ["Fiction"]
maturityRating: "NOT_MATURE"
allowAnonLogging: false
contentVersion: "preview-1.0.0"
panelizationSummary: {containsEpubBubbles: false, containsImageBubbles: false}
imageLinks:
smallThumbnail: "http://books.google.com/books/content?id=OayBxwEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
thumbnail: "http://books.google.com/books/content?id=OayBxwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
__proto__: Object
language: "en"
previewLink: "http://books.google.be/books?id=OayBxwEACAAJ&dq=isbn:9781949202168&hl=&cd=1&source=gbs_api"
infoLink: "http://books.google.be/books?id=OayBxwEACAAJ&dq=isbn:9781949202168&hl=&source=gbs_api"
canonicalVolumeLink: "https://books.google.com/books/about/Stud_Muffin.html?hl=&id=OayBxwEACAAJ"
__proto__: Object
saleInfo: {country: "BE", saleability: "NOT_FOR_SALE", isEbook: false}
accessInfo: {country: "BE", viewability: "NO_PAGES", embeddable: false, publicDomain: false, textToSpeechPermission: "ALLOWED", …}
searchInfo: {textSnippet: "Or will it be a TKO? &#39;Stud Muffin&#39; is a fu…es, Green Valley World, Penny Reid Book Universe."}
__proto__: Object




  getBookData = async (isbn) => {
    const result = await axios.get('')//(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
    console.log(result.data.items[0]);
    if(result.data.items) return result.data.items[0]; 
    else return false;
    console.log(this.bookData.volumeInfo.imageLinks.thumbnail);
    console.log(this.bookData.volumeInfo.title);
    console.log(this.bookData.volumeInfo.publishedDate);
    
  }

  setBookData (data) {
    this.bookData = data;
  }
*/