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
    shelves:[{name:"wantToRead", books:[]}, {name:"currenlyReading", books:[]}, {name:"read", books:[]}]
    // shelves: [{wantToRead:["sJf1vQAACAAJ"],
    //    currentlyReading:["jAUODAAAQBAJ"],
    //    read:[]}     ]  
 };

 searchBooks = (query) => {
   BooksAPI.search(query).then((results) => {
     if (results !== undefined && results.length > 0) {
      console.log("how many books do we find?" + results.length);
      console.log(results);
      const filteredList = results.map((book)=>{
        const bookExist = this.state.books.find(existingBook => existingBook.id === book.id);
        if (bookExist) {
          return;
        } else {
          book.shelf = 'none';
          return book;
        }
      })
      console.log("=== filtered list ====");
      console.log(filteredList);
      // Does not work if use the filtered list
      //  this.setState((currentState) => ({
      //    books: currentState.books.slice(0,currentState.books.length, filteredList)
      //  }))
      this.setState(() => ({
        books: results
      }))
     } else {
      console.log("Oops, no result is found!");
     }
    
   })
 };

  componentDidMount() {
    BooksAPI.getAll().then((allbooks) => { 
      console.log("inside componentDidMount");
      console.log("==> get all books ");
      console.log(allbooks);
      // categorize all books into different shelves
      allbooks.map((book) => {
        console.log('loop through all books');
        console.log(book);
          if (book.shelf === "wantToRead") {
            console.log("this is want to read");
            this.setState((currentState)=>{
              shelves:currentState.shelves[0].books.concat([book]);
            })
          }
          if (book.shelf === "currenlyReading") {
            console.log("this is currentlyReading");
            this.setState((currentState)=>{
              shelves:currentState.shelves[1].books.concat([book]);
            })
          }
          if (book.shelf === "read") {
          this.setState((currentState)=>{
            console.log("this is read");
            shelves:currentState.shelves[2].books.concat([book]);
          })
         }
      })
      this.setState(()=> ({books:allbooks}))
      console.log(this.state.shelves);
    });
  };


  updateBook = (book,shelf) => {
    console.log("update book with shelf:" + shelf);
    BooksAPI.update(book,shelf).then((results) => {
           console.log("updated the book");
           console.log(book);
           console.log("with shelf: " + shelf);
           console.log("=== updated shelves ===");
           console.log(results);
            this.setState(()=> ({
                shelves: results
            }))
          });
  };
    
  addBook = (books) => {
    this.setState((currentState) => ({
      books:currentState.books.concat([books])
    }))
  }

  /*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
  */
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={()=>(
          <Bookshelves shelves={this.state.shelves} update={this.updateBook}/>
        )}/>
        <Route path='/search' render={({ history })=>(
          <Searchbooks results={this.state.books} searchBooks={this.searchBooks} update={this.updateBook}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
