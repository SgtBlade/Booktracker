import {observable, action, decorate, configure} from 'mobx';
import {comment} from './comment';
configure({enforceActions: 'observed'});
class bookPost {
  constructor({title, release, isbn, owned = false}) {
    this.title = title;
    this.release = new Date(release);
    this.isbn = isbn;
    this.owned = owned;
    this.comments = [];
    this.bookData = this.getBookData(isbn)
       .then(data => {return data});
  }

  setOwned() {
    this.owned = true;
  }

  seedComments() {
    this.comments.push(new comment({ user: 'Pikachu99', userID: 4124, content: 'Ah mah gawd I luv dis book', rating: 4 }))
    this.comments.push(new comment({ user: 'Whopper', userID: 213, content: 'Cannot wait for this book to get released', rating: 2 }))
    this.comments.push(new comment({ user: 'PokePotter', userID: 2134, content: 'Oooh a new book', rating: 4 }))
  }

  getBookData = async isbn => {

    let data = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
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

}

decorate(bookPost, {
  owned: observable,
  setOwned: action
});

export default bookPost;
