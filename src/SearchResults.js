import React,{Component} from 'react'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'

class SearchResults extends Component {
  state = {
    books:[]
  }
  componentDidMount(){
    BooksAPI.search('art').then((books)=>{
      this.setState({books:books})
    })
  }
  moveBook = (book,shelf) => {
    this.props.moveBook(book,shelf)
  }
  render(){
    return(
      <div className="list-books-top">
        <div className="close-search">
        </div>
        <div className="list-books-content">
          <Bookshelf onMoveBook={this.moveBook} myBooks={this.state.books} shelf={'Looking'}/>
        </div >
      </div>
    )
  }
}
export default SearchResults
