import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import { render } from 'react-dom'

// Bookshelves
class Bookshelves extends Component {
    static propTypes = {
        allbooks: PropTypes.array.isRequired
    }
    render() {
        const shelves = [
            { title: 'Read', key: 'read' },
            { title: 'Want To Read', key: 'wantToRead' },
            { title: 'Currently Reading', key: 'currentlyReading' }
         ];
        const { allbooks } = this.props
        return ( 
         <div>
           <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
         {
            shelves.map((shelf) => (
                 <div className="bookshelf" key={shelf.key}>
                 <h2 className="bookshelf-title">{shelf.title}</h2>   
                 <div className="bookshelf-books">
                    <ol className="book-grid">
                     { 
                    
                        allbooks.map((book) => (
                          book.shelf === shelf.title) &&  (   
                            <Book book={book} update={this.props.update}/>
                            ) 
                        )
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