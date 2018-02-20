import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Link, Route} from 'react-router-dom'
import './App.css'
import BookShelves from './BookShelves'
import BookGrid from './BookGrid'
import sortBy from 'sort-by'

class BooksApp extends React.Component {
/**
**@param books an array of books retrieved displayed on the main page
* @param search an array of books displayed on the search screen
* @param query a string holding the search query
**/
  state = {
    books : [ ],
    search : [ ],
    query : ""
  }
/** @description Retrieve Book Shelves from Server
*
**/
  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({books : books.sort(sortBy("title"))})
    })
  }

/** @description Callback to update server and update local state
*   @param book object book to be updated
*   @param shelf string the new shelf name it will be part of
*/
  updateBook = (book,shelf) => {
    book.shelf = shelf
    BooksAPI.update(book, shelf).then(() => {
      this.setState((prevState) => ({
        books: prevState.books.filter((oldbook) => book.id !== oldbook.id).concat([book]).sort(sortBy("title"))
      }))
    })
  }
/**
*  @description Callback for searching the Server
*  @param query string search query
**/
  searchBooks = (query) => {
    this.setState({query:query})
    if (query !== "") {
      let search = []
      BooksAPI.search(query, 20).then((searchBooks) => {
        /*** Check against everything in the current bookshelf ***/
        /** Check the search for previous state items to keep persistent data.
        *   There has to be a better way to do this.
        ***/
        if (searchBooks.hasOwnProperty("error")) { return }
        search = searchBooks.map((sBook) => {
          this.state.books.map((book) => {
            if(book.id === sBook.id) {
              sBook.shelf = book.shelf
            }
          })
          return sBook;
        })

        this.setState({
          search: search.sort(sortBy("title"))
        })
      })
    }
    else {
      this.setState({search:[]})
    }
  }

/**
* @description Renders the main page
**/
  render() {
    return (
      <div className="app">
      {/** Search Page **/}
        <Route path="/search" render={()=> (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.searchBooks(event.target.value)} />
                <BookGrid onUpdate={this.updateBook} books={this.state.search} />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )}/>
        {/** Main Page **/}
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelves onUpdate={this.updateBook} books={this.state.books} />
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
