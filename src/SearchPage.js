import React,{Component} from 'react'
import Bookshelf from './Bookshelf'
import escapeRegExp from 'escape-string-regexp'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchPage extends Component {
  state = {
    query:'',
    queryResults:[],//The results
    myBooks:[],//The full collection of saved books
    myBooksOnDisplay:[]//Books in my Collection Relevants to the search
  }
  updateQuery = (query) =>{
      this.setState({query:query})
        BooksAPI.search(this.state.query).then((books)=>{
        //intersction between books in collection X results
        if (books) {
          let interse =[]
          for (const book of books) {
            for ( const b of this.state.myBooks) {
              if (b.id === book.id){
                book.shelf=b.shelf;
                interse.push(book);
                books = books.filter((b) => (b.id!==book.id))
              }
            }
          }
          this.setState({myBooksOnDisplay:interse})
          //Excluding books displayed in my collection
          this.setState({queryResults:books})
        }
      })
  }
  moveBook = (book,shelf) => {
    this.props.onMoveBook(book,shelf)//Sending the request to the main app.js Component
    //updating visual diplay of the books
    shelf!=='none' ?
      (this.setState((state)=>({
        myBooksOnDisplay: state.myBooksOnDisplay.concat(book),
        queryResults:state.queryResults.filter((b) => b.id !== book.id),
        myBooks: state.myBooks.concat(book)
      })))
    :
      (this.setState((state)=>({
        myBooksOnDisplay: state.myBooksOnDisplay.filter((b) => b.id !== book.id),
        queryResults: state.queryResults.concat(book),
        myBooks: state.myBooks.filter((b) => b.id !== book.id)
      })))
  }

  componentDidMount(){
    //the same results could be passed as props from app.js
    BooksAPI.getAll().then((myBooks)=>{
      this.setState({myBooks:myBooks})
    })
  }

  render(){
    //ensuring the correct display from the search
    let myBooksOnDisplay =[]
    let queryResults = []
    if (this.state.query) {
      //const match = new RegExp(escapeRegExp(this.state.query),'i') was here for more specific matches
      myBooksOnDisplay = this.state.myBooksOnDisplay
      queryResults = this.state.queryResults
    }
    return(
      <div className="search-books">
        <div className="search-books-bar">
            <div className="search-books-input-wrapper">
              <input
                className="search-books-bar"
                type="text"
                placeholder="SearchBooks"
                value={this.state.query}
                onChange={(event)=>this.updateQuery(event.target.value)}
              />
            </div>
        </div>
        <div className="search-books-results">
          <div className="list-books-content">
            <Bookshelf onMoveBook={this.moveBook} myBooks={myBooksOnDisplay} shelf={'On My Colection'}/>
            <Bookshelf onMoveBook={this.moveBook} myBooks={queryResults} shelf={'Looking'}/>
          </div >
          <Link className="close-search" to="/">Back to home</Link>
        </div>
      </div>
    )
  }
}
export default SearchPage
