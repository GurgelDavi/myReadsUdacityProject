import React,{Component} from 'react'
import Bookshelf from './Bookshelf'
import SearchResults from './SearchResults';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import {Link} from 'react-router-dom'

class SearchPage extends Component {
  state = {
    query:'',
    books:[]
  }
  updateQuery = (query) =>{
      this.setState({query:query.trim()})
  }
  render(){
    let displayedBooks
    if (this.state.query){
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      displayedBooks = this.props.myBooks.filter((book) => match.test(book.title))
    }else {
      displayedBooks = this.props.myBooks;
    }
    return(
      <div>
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
        <div className="list-books-top">
          <div className="list-books-content">
            <Bookshelf myBooks={displayedBooks} shelf={'Looking'}/>
          </div >
          <Link className="close-search" to="/">Back to home</Link>
        </div>
      </div>
    )
  }
}
export default SearchPage
