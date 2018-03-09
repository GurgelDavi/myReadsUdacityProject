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
  removeBook = (book) => {
    this.setState(state=>({
      books: state.books.filter((b) => b.id !== book.id)
    }))
  }
  moveBook = (book,shelf) => {
    this.setState(state=>({
      books: state.books.filter((b) => b.id !== book.id)
    }))
    this.setState((state)=>({
      books: state.books.concat([
        {
          "id":book.id,
          "title":book.title,
          "authors":book.authors,
          "imageLinks":book.imageLinks,
          "shelf":shelf,
          "publisher":book.publisher,
          "publishedDate":book.publishedDate,
          "description":book.description,
          "industryIdentifiers":book.industryIdentifiers,
          "readingModes":book.readingModes,
          "pageCount":book.pageCount,
          "printType":book.printType,
          "categories":book.categories,
          "averageRating":book.averageRating,
          "ratingsCount":book.ratingsCount,
          "maturityRating":book.maturityRating,
          "allowAnonLogging":book.allowAnonLogging,
          "contentVersion":book.contentVersion,
          "imageLinks":book.imageLinks,
          "languagepreviewLink":book.languagepreviewLink,
          "infoLink":book.infoLink,
          "canonicalVolumeLink":book.canonicalVolumeLink
        }
      ])
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
               <Link to="/searchBook">Add a book</Link>
            </div>
          </div>
        </div>
      )}/>
      <Route path="/searchBook" render={()=>(
        <div className="list-books">
          <SearchPage myBooks={this.state.books}/>
        </div>
      )}/>
      </div>
    )
  }
}

export default BooksApp
