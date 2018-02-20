import React, { Component} from 'react';
import PropTypes from 'prop-types'
///import { Link } from 'react-router-dom'
///import sortBy from 'sort-by'
/**
* @description a component for the grid used on the search page
*@param books a list of books to be displayed in the BookGrid
*@param onUpdate a callback function that passes the book state to be updated.
**/
class BookGrid extends Component {
  static PropTypes = {
    books : PropTypes.array.isRequired,
    onUpdate : PropTypes.func.isRequired
  }

  render(){
    const { books, onUpdate } = this.props
    if (typeof(books)===undefined) { return null }
    return(
      <ol className="books-grid">
        { typeof(books) !== undefined && books.map((book)=> ( 
          <li key={book.id} className="book">
            <div className="book">
            <div className="book-top">
              <div className="book-cover" style={ book.hasOwnProperty("imageLinks") ? { width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}: {width: 128, height: 193}}></div>
              <div className="book-shelf-changer">
              <select onChange={(event) => onUpdate(book, event.target.value)} defaultValue={book.hasOwnProperty("shelf") ? book.shelf : "none"}> {/**On Change **/}
              <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>

              </div>
            </div>
            <div className="book-title">{book.title}</div>
            {book.hasOwnProperty("authors") &&  book.authors.map((author) =>(
            <div key={author} className="book-authors">{author}</div>
          ))}
            </div>
          </li>
       ))}
     </ol>
    )
  }
}

export default BookGrid
