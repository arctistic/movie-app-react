import React from 'react';
import {data} from '../data';
import Navbar from './Navbar'
import MovieCard from './MovieCard'
import {addMovies, setShowFavourites} from '../actions'

class App extends React.Component{
  componentDidMount(){
    // make api call
    // dispatch action
    
    const { store } = this.props
    store.subscribe(()=>{
      console.log("UPDATED");
      this.forceUpdate();
    });
    
    store.dispatch(addMovies(data));
  }

  isFavourite = (movie) =>{
    const { favourites } = this.props.store.getState();
    const index = favourites.indexOf(movie);
    if (index !== -1){
      // movie found
      return true;
    }
    return false;
  }

  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavourites(val))
  }
  
  
  render(){
    console.log('STATE', this.props.store.getState());
    const {list, favourites, showFavourites} = this.props.store.getState(); // {list:[], favourites: []}
    const displayMovies = showFavourites ? favourites : list
    return (
      <div className="App">
        <Navbar />
        <div className='main'>
          <div className='tabs'>
            <div className={`tab ${showFavourites ? '' : 'active-tabs'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
            <div className={`tab ${showFavourites ? 'active-tabs' : ''}`} onClick={() => this.onChangeTab(true)}>Favourites</div>
          </div>
          <div className='list'>
            {displayMovies.map((movie, index) => {
              return( 
                <MovieCard
                  movie={movie}
                  key={`movies-${index}`}
                  dispatch={this.props.store.dispatch}
                  isFavourite={this.isFavourite(movie)}
                />
              )
            })}
          </div>
          {displayMovies.length === 0 ? <div> No movies to display! </div> : null }
        </div>
      </div>
    );
  } 
}

export default App;
