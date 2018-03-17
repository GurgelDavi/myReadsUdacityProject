import React from 'react'
import {Link} from 'react-router-dom'
import {Route} from 'react-router'
import Bookshelf from './Bookshelf'
import SearchPage from './SearchPage'
import * as BooksAPI from './BooksAPI'
import './App.css'


class BooksApp extends React.Component {
  state = {
    books :[],
    showSearchPage: true
  }
   componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({books:books})
    })
  }

  moveBook = (book,shelf) => {
    console.log(book.title + ' to ' + shelf);
    this.setState(state=>({
      books: state.books.filter((b) => b.id !== book.id)
    }))
    book.shelf = shelf
    this.setState((state)=>({
      books: state.books.concat(book)
    }))
    BooksAPI.update(book,shelf)
  }

  render() {
    return (
      <div className="app">
      <Route exact path="/" render={()=>(
        <div>
          <div className="list-books">
            <div className="list-books-title">
              <h1>My Reads</h1>
            </div>
          </div>
          <div className="list-books-top">
            <div className="list-books-content">
              <Bookshelf onMoveBook={this.moveBook} myBooks={this.state.books.filter((book)=>book.shelf==='currentlyReading')} shelf={'currentlyReading'}/>
              <Bookshelf onMoveBook={this.moveBook} myBooks={this.state.books.filter((book)=>book.shelf==='wantToRead')} shelf={'wantToRead'}/>
              <Bookshelf onMoveBook={this.moveBook} myBooks={this.state.books.filter((book)=>book.shelf==='read')} shelf={'Read'}/>
            </div>
            <div className="open-search">
               <Link to="/search">Add a book</Link>
            </div>
          </div>
        </div>
      )}/>
      <Route path="/search" render={()=>(
        <div className="list-books">
          <SearchPage onMoveBook={this.moveBook} myBooks={this.state.books}/>
        </div>
      )}/>
      </div>
    )
  }
}

export default BooksApp
