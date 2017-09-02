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
  }

  handleChange(event) {
    this.setState({query: event.target.value});
  }

  handleSubmit() {
    this.setState({search: true})
  }

  handlePopularMovies() {
    this.setState({auto: true})
    this.setState({search: true})
  }

  render() {
    return (
      <div>
        {
          !this.state.search ? 
            <Search handleChange={this.handleChange} handleSubmit={this.handleSubmit} query={this.state.query} handlePopularMovies={this.handlePopularMovies}/>
          :
            <QuerySearchResults searchQuery={this.state.query} auto={this.state.auto} />
        }
      </div>
    );
  }
}

export default App;
