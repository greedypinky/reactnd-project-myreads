import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import { render } from 'react-dom'

// Bookshelves
class Bookshelves extends Component {
    static propTypes = {
        shelves: PropTypes.array.isRequired,
    }
    render() {
        const { shelves } = this.props
        return ( 
         <div>
         {
             Object.keys(shelves).map((shelf)=> (
                 <div className="bookshelf">
                 <h2 className="bookshelf-title">{shelf}</h2>   
                 <div className="bookshelf-books">
                    <ol className="book-grid">
                     { 
                         shelves[shelf].map((id) => (
                            BooksAPI.get(id).then((book) => (
                            <Book book={book} update={this.props.update}/>
                            ))
                         ))
                     }
                    </ol>
                </div>
                </div>
             ))
         }
          <div className="open-search">
              // navigate to /search page
              <button onClick={() => {}}>Add a book</button>
          </div>
         </div>
         
            
        )
    }
}
export default Bookshelves