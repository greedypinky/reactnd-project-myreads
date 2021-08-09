import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { Link } from 'react-router-dom'

class Searchbooks extends Component {

    static propTypes = {
        // set the propTypes for the Props
        // results: PropTypes.array.isRequired,
        searchBooks: PropTypes.func.isRequired,
        update: PropTypes.func.isRequired,
    }

    state = {
        query:''
    }
   
    updateQuery = (query) => {
       
        // search the api by the latest
        if (query.length > 0 && query !== undefined) {
            console.log("we search!")
            console.log("what is the query?" + query)
            this.props.searchBooks(query)
        }
        this.setState(()=> ({
            query:query
         }))
    }

    cleanQuery = ()=> {
        this.updateQuery('')
    }

    render() {
        const { query } = this.state
        const { results, searchBooks, update} = this.props
       
        return (
            <div className="search-books">
            <div className="search-books-bar">
               <Link className='close-search' to='/'>Close</Link>
                <div className="search-books-input-wrapper">
                    <input 
                        type="text" 
                        placeholder="Search by title or author"
                        value={query}
                        onChange={ (event) => this.updateQuery(event.target.value)}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                { results !== undefined && results.length > 0 &&
                    this.props.results.map((result) => (
                        <Book book={result} update={this.props.update}/>
                    ))
                } 
                </ol>
                </div>
            </div>
        )
    }
}
export default Searchbooks
