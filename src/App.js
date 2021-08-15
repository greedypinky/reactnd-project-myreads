import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelves from './Bookshelves'
import Searchbooks from './Searchbooks'
import { BrowserRouter, Route, Link } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    results:[],
 };

 searchBooks = (query) => {
   BooksAPI.search(query).then((results) => {
     if (results !== undefined && results.length > 0) {
      console.log("how many books do we find?" + results.length);
      console.log(results);
      const filteredList = results.map((book)=>{
        console.log("go through book");
        console.log(book);
        if (this.state.books.length > 0) {
          const bookExist = this.state.books.find( (existingBook) => {
            console.log("what is existingBook?");
            console.log(existingBook);
            return existingBook.id === book.id 
          });
          if (bookExist) {
            return;
          } else {
            book.shelf = 'none';
            return book;
          }
        }
      })

       this.setState({
         books: filteredList
       })
     } else {
      console.log("Oops, no result is found!");
     }
    
   })
 };

  getAll = () => { 
    BooksAPI.getAll().then((allbooks) => { 
      console.log("=====Get all books======");
      this.setState(()=> ({books:allbooks}))
     });
  }

  componentDidMount() {
    this.getAll();
    console.log(this.state.books);
  };

  updateBook = (book,shelf) => {
    console.log("update book with shelf:" + shelf);
    BooksAPI.update(book,shelf).then((results) => {
           console.log("updated the book");
           console.log(book);
           console.log("with shelf: " + shelf);
           console.log("=== updated shelves ===");
           console.log(results);
           this.getAll();
          });
  };
    
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={()=>(
          <Bookshelves allbooks={this.state.books} update={this.updateBook}/>
        )}/>
        {/* <Route path='/search' render={({ history })=>(
          <Searchbooks results={this.state.results} searchBooks={this.searchBooks} update={()=> {
            this.updateBook
            history.push('/')
          }}/>
        )}/> */}
          <Route path='/search' render={({ history })=>(
          <Searchbooks results={this.state.results} searchBooks={this.searchBooks} update={
            this.updateBook
          }/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
