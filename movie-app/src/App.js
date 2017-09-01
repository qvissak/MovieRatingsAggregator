import React, { Component } from 'react';
import Footer from './components/footer';
import MovieHeader from './util/movieHeader.png';
import Search from './components/search';
import * as movieAPI from './components/movieAPI'; 
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      search: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({query: event.target.value});
  }

  handleSubmit(event) {
    this.setState({search: true})
  }

  render() {
    return (
      <div>
        {
          !this.state.search 
          ? 
          <div>
            <div className="center">
              <img className="homepage-image" src={MovieHeader} alt="movieHeader" />
              <br />
              <form onSubmit={this.handleSubmit}>
                <input type="search" value={this.state.query} onChange={this.handleChange} placeholder="Try searching a movie title, actor or genre" name="query"></input>
                <br />
                <input type="submit" value="Search Movie" onChange={this.handleChange}></input>
              </form>
              <input type="submit" value="Popular Movies"></input>   
            </div>
            <Footer />
          </div>
          :
         <Search searchQuery={this.state.query} />
        }
      </div>
    );
  }
}

export default App;
