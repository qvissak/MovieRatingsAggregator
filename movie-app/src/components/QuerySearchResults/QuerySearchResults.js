import React, { Component } from 'react';
import Footer from '../Footer/footer';
import * as movieAPI from '../MovieAPI/movieAPI';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BackButton from '../BackButton/backButton';
import './QuerySearchResults.css';

class QuerySearchResults extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: []
      }
    }

    componentWillMount() {
        var response = !this.props.auto ? movieAPI.getSearchResults(this.props.searchQuery) : movieAPI.getPopularResults();
        response.then(res => {
            if (res) this.setState({ data: this.state.data.concat(res.results) });
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
                    var rating = item.vote_count === 0 ? "No reviews yet" : item.vote_average + `/10 (` + item.vote_count + `)`
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
                                    <b>Average Rating: </b>{rating}
                                    <br />
                                    <br />
                                    <b>Description: </b>
                                    {item.overview}
                                </CardText>
                                <CardActions>
                                    <FlatButton label="Compare" />
                                </CardActions>
                                <CardText expandable={true}></CardText>
                            </Card>
                            </MuiThemeProvider>
                        </div>
                    ) 
                }) 
                :
                console.log("Need to implement");
        var title = !this.props.auto ? "Showing search results for " + this.props.searchQuery + ":" : "Top 20 Trending Movies:";
        return (
            <div>
                <div className="container">
                    <h1>{title}</h1>
                    {items}
                </div>
                <BackButton back={this.props.back} />
                <Footer />
            </div>
        );
    }
}

export default QuerySearchResults;