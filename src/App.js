import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelves from './Bookshelves'
import Searchbooks from './Searchbooks'
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    results: [],
  };

  searchBooks = (query) => {
    if (query !== undefined && query.length === 0) {
      this.resetSearch();
    } else {
      BooksAPI.search(query).then((results) => {
        if (results !== undefined && results.length > 0) {
          const filteredList = results.map((book) => {
            if (this.state.books !== undefined && this.state.books.length > 0) {
              const bookExist = this.state.books.find((existingBook) => {
                return existingBook.id === book.id
              });
              if (bookExist !== undefined) {
                return bookExist;
              } else {
                book.shelf = 'none';
                return book;
              }
            }
          })
          if (filteredList !== undefined && filteredList.length > 0) {
            this.setState({
              results: filteredList
            })
          }
        } else {
          console.log("Oops, no result is found!");
        }

      })
    }
  };

  async getAll() {
    const books = await BooksAPI.getAll();
    this.setState({
      books: books
    })
  }

  componentDidMount() {
    this.getAll();
  }

  updateBook = (book, shelf) => {
    console.log("update book with shelf:" + shelf);
    BooksAPI.update(book, shelf).then((results) => {
      // update the books on the shelves
      this.getAll();
      // also need to update the search book results
      this.state.results.map(result => {
        if (result.id === book.id) {
          result.shelf = shelf;
        }
      })

    });
  };

  resetSearch = () => {
    this.setState({
      results: []
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/'>
          <Bookshelves allbooks={this.state.books} update={this.updateBook} />
        </Route>
        <Route exact path='/search'>
          <Searchbooks results={this.state.results} update={this.updateBook} searchBooks={this.searchBooks} />
        </Route>
      </div>
    )
  }
}

export default BooksApp
