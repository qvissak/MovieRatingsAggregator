import React, { Component } from 'react';
import Search from './components/Search/search';
import QuerySearchResults from './components/QuerySearchResults/QuerySearchResults';
import ComparePage from './components/ComparePage/comparePage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      search: false,
      auto: false,
      comparison: [],
      revealComparison: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePopularMovies = this.handlePopularMovies.bind(this);
    this.back = this.back.bind(this);
    this.updateComparison = this.updateComparison.bind(this)
    this.RevealComparison = this.RevealComparison.bind(this);
  }

  RevealComparison() {
    this.setState({revealComparison: !this.state.revealComparison})
  }

  handleChange(event) {
    this.setState({query: event.target.value});
  }

  handleSubmit() {
    this.setState({search: true})
  }

  back() {
    this.setState({search: false})
  }

  handlePopularMovies() {
    this.setState({auto: true})
    this.setState({search: true})
  }

  updateComparison(title) {
    this.setState({ comparison: this.state.comparison.concat(title) });
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
          !this.state.revealComparison ? 
            <QuerySearchResults
              searchQuery={this.state.query} 
              auto={this.state.auto} 
              back={this.back} 
              updateComparison={this.updateComparison}
              comparison={this.state.comparison}
              revealComparison={this.RevealComparison}
            />
            :
            <ComparePage back={this.back}/>
        }
      </div>
    );
  }
}

export default App;
