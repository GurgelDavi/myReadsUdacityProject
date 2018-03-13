import React, {Component} from 'react'

function Bookshelf (props) {
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{props.shelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {props.myBooks.map((book)=>(
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{
                      width: 128, height: 193, backgroundImage:`url(${book.imageLinks.smallThumbnail})`
                      }}>
                    </div>
                    <div className="book-shelf-changer">
                      <select>
                      <option value="none" disabled>Move to...</option>
                      <option onClick={()=>props.onMoveBook(book,"currentlyReading")}value="currentlyReading">Currently Reading</option>
                      <option onClick={()=>props.onMoveBook(book,"wantToRead")}value="wantToRead">Want to Read</option>
                      <option onClick={()=>props.onMoveBook(book,"read")} value="read">Read</option>
                      <option onClick={()=>props.onMoveBook(book,"none")} value="none">None</option>
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
export default Bookshelf
