import React, { Component } from 'react';
import Search from './components/Search/search';
import QuerySearchResults from './components/QuerySearchResults/QuerySearchResults';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      search: false,
      auto: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePopularMovies = this.handlePopularMovies.bind(this);
    this.back = this.back.bind(this);
  }

  handleChange(event) {
    this.setState({query: event.target.value});
  }

  handleSubmit() {
    this.state.query !== "" ? this.setState({search: true}) : alert("Type in the search bar to find a movie or press the Popular Movies button to see a suggestion!")
  }

  back() {
    this.setState({search: false});
    this.setState({auto: false});
    this.setState({query: ""});
  }

  handlePopularMovies() {
    this.setState({auto: true})
    this.setState({search: true})
  }

  render() {
    // Apologies for not using react-router
    return (
      <div>
        {
          !this.state.search ? 
            <Search 
              handleChange={this.handleChange} 
              handleSubmit={this.handleSubmit} 
              query={this.state.query} 
              handlePopularMovies={this.handlePopularMovies}
            />
          :
            <QuerySearchResults
              searchQuery={this.state.query} 
              auto={this.state.auto} 
              back={this.back} 
            />
        }
      </div>
    );
  }
}

export default App;
