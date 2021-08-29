import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
        query: ''
    }

    updateQuery = (query) => {
        this.props.searchBooks(query)
        this.setState(() => ({
            query: query
        }))
    }

    render() {
        const { query } = this.state
        const { results, update } = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className='close-search' to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {results !== undefined && results.length > 0 &&
                            this.props.results.map((result) => (
                                <li key={result.id}>
                                    <Book book={result} update={update} />
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        )
    }
}
export default Searchbooks
