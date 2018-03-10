import React,{Component} from 'react'
import Bookshelf from './Bookshelf'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchPage extends Component {
  state = {
    query:'',
    books:[]
  }
  updateQuery = (query) =>{
      this.setState({query:query})
      BooksAPI.search(this.state.query).then((books)=>{
        this.setState({books:books})
      })
  }
  moveBook = (book,shelf) => {
    this.props.onMoveBook(book,shelf)
    console.log('movingBook');
  }

  render(){

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
            <Bookshelf onMoveBook={this.moveBook} myBooks={this.state.books} shelf={'Looking'}/>
          </div >
          <Link className="close-search" to="/">Back to home</Link>
        </div>
      </div>
    )
  }
}
export default SearchPage
