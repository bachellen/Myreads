import React from 'react'
import * as BooksAPI from './BooksAPI';
import './App.css'
import Search from './compenent/Search';
import Shelves from './compenent/Shelves';
import Header from './compenent/Header';
import SearchButton from './compenent/SearchButton';

class BooksApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      showSearchPage: false,
      books: [],
      query: ""
    };
    this.componentDidMount= this.componentDidMount.bind(this)
  }

  search
   
  changeBookShelf = (book, shelf) => {
    var filteredBooks =  this.state.books.map( (b) => {

       if( b.id === book.id) {
         b.shelf = shelf
         return b
        }
          return b
      })

  this.setState({
    books:filteredBooks
  });
  //console.log(filteredBooks)
  // alert('hukhjh')
  };

  showSearchPagefunc = state => { this.setState({ showSearchPage: state });};
  componentDidMount(){
    BooksAPI.getAll().then(resp => this.setState({books : resp}))
    BooksAPI.search(this.state.query);
  }
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
        <Search showSearchPage = {this.showSearchPagefunc}
        books =  {this.state.books} 
        ChangeShelf = {(b,e)=>this.changeBookShelf(b,e)}/>
        ) : (
          <div className="list-books">
           <Header/>
         <Shelves allBooks = {this.state.books}
         ChangeShelf = {(b,e)=>this.changeBookShelf(b,e)}
         />
           <SearchButton showSearchPage = {this.showSearchPagefunc}/>
          </div>
        )}
      </div>
    )
  }
}
export default BooksApp;