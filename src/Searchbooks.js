import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { Link } from 'react-router-dom'
 /*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
  */
class Searchbooks extends Component {

    static propTypes = {
        results: PropTypes.array.isRequired,
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
                        <Book book={result} update={this.props.update} id={result.id}/>
                    ))
                } 
                </ol>
                </div>
            </div>
        )
    }
}
export default Searchbooks
