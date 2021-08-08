import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
    // static ProtoTypes {
    // }

    state = {
        shelf:''
    }

    handleSelect = (e) => {
        e.preventDefault();
        console.log("before setState" + this.state.shelf);
        console.log("event target value?" + e.target.value);
        const newShelf = e.target.value;
        this.setState(() => ({
            shelf: newShelf
        }))
        console.log("after setState current shelf?" + newShelf);
        // update book's shelf using method updateBook
        this.props.update(this.props.book, e.target.value)
    }

    render() {
        const { shelf } = this.state
        const { book } = this.props
        return (
            <li key={book.id}>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                            <select value={this.state.shelf} onChange={this.handleSelect}>
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
