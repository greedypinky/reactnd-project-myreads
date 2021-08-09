import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import { render } from 'react-dom'

// Bookshelves
class Bookshelves extends Component {
    static propTypes = {
        shelves: PropTypes.array.isRequired
    }
    render() {
        const { shelves } = this.props
        return ( 
         <div>
           <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
         {
            shelves.map((shelf) => (
                 <div className="bookshelf">
                 <h2 className="bookshelf-title">{shelf.name}</h2>   
                 <div className="bookshelf-books">
                    <ol className="book-grid">
                     { 
                        shelf.books.map((book) => (
                            <Book book={book} update={this.props.update}/>
                        ))
                     }
                    </ol>
                </div>
                </div>
             ))
         }
         <Link className='open-search' to='/search'>
            <button>Add a book</button>
         </Link>
         </div>
        )
    }
}
export default Bookshelves