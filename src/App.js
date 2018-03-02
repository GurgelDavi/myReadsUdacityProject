import React from 'react'
import Bookshelf from './Bookshelf'
// import * as BooksAPI from './BooksAPI'
import './App.css'


class BooksApp extends React.Component {
  state = {
    books :[
      {
        "id":"toKillAMockingbird",
        "title":"To Kill a Mockingbird",
        "authors":"Harper Lee",
        "coverURL":"http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
        "shelf":"null"
      },
      {
        "id":"endersGame",
        "title":"Ender's Game",
        "authors":"Orson Scott Card",
        "coverURL":"http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api",
        "shelf":"null"
      },
      {
        "id":"1776",
        "title":"1776",
        "authors":"David McCullough",
        "coverURL":"http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api",
        "shelf":"null"
      }

    ],
    showSearchPage: false
  }

  render() {
    return (
      <div className="app">
        <div className="list-books-content">
          <Bookshelf myBooks={this.state.books} shelf={'wantToRead'}/>
          <Bookshelf myBooks={this.state.books} shelf={'currentlyReading'}/>
          <Bookshelf myBooks={this.state.books} shelf={'doneReading'}/>
        </div>
      </div>

    )
  }
}

export default BooksApp
