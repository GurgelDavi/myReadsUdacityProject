import React,{Component} from 'react'
import Bookshelf from './Bookshelf'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchPage extends Component {
  state = {
    query:'',
    queryResults:[],
    myBooks:[],
    myBooksOnDisplay:[]
  }
  updateQuery = (query) =>{
      this.setState({query:query})
      BooksAPI.search(this.state.query).then((books)=>{
        //interseção entre livros já na biblioteca
        let interse =[]
        let dif = books
        for (const book of books) {
          for ( const b of this.state.myBooks) {
            if (b.id === book.id){
              interse.push(book);
              dif = dif.filter((b) => (b.id!==book.id))
            }
          }
        }
        this.setState({myBooksOnDisplay:interse})

        //Excluindo livros repetidos nos resultados

        this.setState({queryResults:dif})

      })
  }
  moveBook = (book,shelf) => {
    this.props.onMoveBook(book,shelf)
  }
  componentDidMount(){
    BooksAPI.getAll().then((myBooks)=>{
      this.setState({myBooks:myBooks})
    })
  }

  render(){

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
            <Bookshelf onMoveBook={this.moveBook} myBooks={this.state.myBooksOnDisplay} shelf={'On My Colection'}/>
            <Bookshelf onMoveBook={this.moveBook} myBooks={this.state.queryResults} shelf={'Looking'}/>
          </div >
          <Link className="close-search" to="/">Back to home</Link>
        </div>
      </div>
    )
  }
}
export default SearchPage
