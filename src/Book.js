import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
    static ProtoTypes = {
        books: PropTypes.array.isRequired
    }

    handleSelect = (e) => {
        e.preventDefault();
        const newShelf = e.target.value;
        // update book's shelf using method updateBook
        this.props.update(this.props.book, e.target.value)
    }

    render() {
        const { book, id } = this.props
        return (
            <li key={id} id={id}>
            <div className="book">
                <div className="book-top">
                    {book.imageLinks !== undefined && (
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                    </div>
                    )}
                    <div className="book-shelf-changer">
                        <select value={book.shelf} onChange={this.handleSelect}>
                            <option value="move" disabled>Move to...</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                            <option value="currentlyReading">Currently Reading</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
            </li>
        )
    }
}

export default Book
