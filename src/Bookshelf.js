import React, {Component} from 'react'
//title
//authors
//publisher
//publishedDate
//description
//industryIdentifiers
//readingModes
//pageCount
//printType
//categories
//averageRating
//ratingsCount
//maturityRating
//allowAnonLogging
//contentVersion
//imageLinks
//languagepreviewLink
//infoLink
//canonicalVolumeLink
//id
//shelf
class Bookshelf extends Component {
  state = {
    myBooks:[]
  }
  render(){
    this.props.myBooks.map((book)=>(
      console.log(book.imageLinks)
    ))
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.myBooks.map((book)=>(
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{
                      width: 128, height: 193, backgroundImage:`url(${book.imageLinks})`
                      }}>
                    </div>
                    <div className="book-shelf-changer">
                      <select>
                      <option value="none" disabled>Move to...</option>
                      <option onClick={()=>this.props.onMoveBook(book,"currentlyReading")}value="currentlyReading">Currently Reading</option>
                      <option onClick={()=>this.props.onMoveBook(book,"wantToRead")}value="wantToRead">Want to Read</option>
                      <option onClick={()=>this.props.onMoveBook(book,"read")} value="read">Read</option>
                      <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                 <div className="book-title">{book.title}</div>
                 <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}
export default Bookshelf
