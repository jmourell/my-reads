import React, { Component} from 'react';
import PropTypes from 'prop-types'
///import { Link } from 'react-router-dom'
///import sortBy from 'sort-by'
/**
* @description a component for the grid used on the main page
*@param books a list of books to be displayed on each shelf
*@param onUpdate a callback function that passes the book state to be updated.
**/
class BookShelves extends Component {
  static PropTypes = {
    books : PropTypes.array.isRequired,
    onUpdate : PropTypes.func.isRequired
  }

/** Creates a  Shelf -
 * @function name - Name of the Shelf
 *           id - Id of the shelf
 *  TO DO - Book should be a seperate component
 **/
  createShelf = (name, id) => {
    const {books, onUpdate }  = this.props
    return (
      <div className="bookshelf">
      <h2 className="bookshelf-title">{name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          { books.filter((book)=>book.shelf === id).map((book)=>( /** map over all books in the  matching the shelf **/
            <li key={book.id} className="book">  {/**Unique Id for books **/}
              <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select onChange={(event) => onUpdate(book, event.target.value)}defaultValue={id}> {/**On Change **/}
                    <option value="disabled" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              {book.authors.map((author) =>(
              <div className="book-authors">{author}</div>
            ))}
              </div>
              </li>
         ))}
       </ol>
     </div>
     </div>)
  }

  render(){
    const [CURRENT, WANT, READ ]= ["currentlyReading", "wantToRead", "read"]
    return (
      <div>
      { this.createShelf("Currently Reading", CURRENT) }
      { this.createShelf("Want to Read", WANT) }
      { this.createShelf("Read", READ)}
      </div>)
  }
}

export default BookShelves
