import React, { Component } from 'react';
import Footer from '../Footer/footer';
import MovieHeader from '../../util/movieHeader.png';
import './search.css';

class Search extends Component {
    render () {
        return (
          <div>
            <div className="container">
              <div className="center">
                <img className="homepage-image" src={MovieHeader} alt="movieHeader" />
                <br />
                <form onSubmit={this.props.handleSubmit}>
                  <input className="search-bar-homepage" type="search" value={this.props.query} onChange={this.props.handleChange} placeholder="Search for a movie, TV show, person..."></input>
                  <br />
                  <input type="submit" value="Search Content" onChange={this.props.handleChange}></input>
                </form>
                <form onSubmit={this.props.handlePopularMovies}>
                  <input type="submit" value="Popular Movies"></input>   
                </form>
              </div>
            </div>
            <Footer />
          </div>
        );
    }
}

export default Search;