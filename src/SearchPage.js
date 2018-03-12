import React,{Component} from 'react'
import Bookshelf from './Bookshelf'
import escapeRegExp from 'escape-string-regexp'
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
    this.setState(state=>({
      myBooksOnDisplay: state.myBooksOnDisplay.filter((b) => b.id !== book.id),
      queryResults:state.queryResults.filter((b) => b.id !== book.id)

    }))
    if (shelf!=='none')
    {
        this.setState((state)=>({
          myBooksOnDisplay: state.myBooksOnDisplay.concat(book)
        }))

    }else {
      this.setState((state)=>({
        queryResults: state.queryResults.concat(book)
      }))
    }
    console.log('moved');
  }
  componentDidMount(){
    BooksAPI.getAll().then((myBooks)=>{
      this.setState({myBooks:myBooks})
    })
  }

  render(){
    let myBooksOnDisplay
    let queryResults
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query),'i')
      myBooksOnDisplay = this.state.myBooksOnDisplay.filter((book)=>match.test(book.title))
      queryResults = this.state.queryResults.filter((book)=>match.test(book.title))
    } else {
      myBooksOnDisplay = []
      queryResults = []
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
