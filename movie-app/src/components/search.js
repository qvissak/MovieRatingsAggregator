import React, { Component } from 'react';
import Footer from './footer';
import * as movieAPI from './movieAPI';

class Search extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: []
      }
    }

    componentWillMount() {
        var response = movieAPI.getSearchResults(this.props.searchQuery);
        response.then(res => {
            this.setState({ data: this.state.data.concat(res.results) });
        }).catch(error => {
            console.log(error);
        });
    }

    render () {
        const MOVIE_IMAGE_URL = "https://image.tmdb.org/t/p/w500"
        const { data } = this.state;
        const items = 
            data 
                ? 
            data.map((item, index) => 
                { 
                    return (<li key={index}>{item.title} {item.vote_average} {item.vote_count} {item.overview} {item.relase_date}</li>) 
                }) 
                : 
            [];
        return (
            <div>
                <ul>
                    {items}
                </ul>
                <Footer />
            </div>
        );
    }
}

export default Search;