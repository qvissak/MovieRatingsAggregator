import React, { Component } from 'react';
import Footer from './footer';
import * as movieAPI from './movieAPI';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './search.css';

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
                    return (
                        <div className="card" key={index}>
                            <MuiThemeProvider>
                            <Card>
                                <CardHeader
                                    title={item.title}
                                    subtitle={item.release_date}
                                    avatar={MOVIE_IMAGE_URL + item.poster_path}
                                    actAsExpander={true}
                                    showExpandableButton={true}
                                />
                                <CardText>
                                    Average Rating: {item.vote_average}/10 ({item.vote_count})
                                </CardText>
                                <CardActions>
                                    <FlatButton label="Compare" />
                                </CardActions>
                                <CardText expandable={true}>{item.overview}</CardText>
                            </Card>
                            </MuiThemeProvider>
                        </div>
                    ) 
                }) 
                : 
            [];
        return (
            <div>
                {items}
                <Footer />
            </div>
        );
    }
}

export default Search;