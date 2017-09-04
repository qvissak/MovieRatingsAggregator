import React, { Component } from 'react';
import Footer from '../Footer/footer';
import * as movieAPI from '../MovieAPI/movieAPI';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BackButton from '../BackButton/backButton';
import './QuerySearchResults.css';

class QuerySearchResults extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        NYTReview: []
      }
    }

    // Load API data from both sources into states
    componentWillMount() {
        var response = !this.props.auto ? movieAPI.getSearchResults(this.props.searchQuery) : movieAPI.getPopularResults();
        response.then((res) => {
            if (res) this.setState({ data: this.state.data.concat(res.results) });
            for (var i = 0; i < this.state.data.length; i++){
                var reviews = movieAPI.getReviewResults(this.state.data[i].title);
                reviews.then((res2) => {
                    res2 ? (res2.results ? this.setState({ NYTReview: this.state.NYTReview.concat(res2.results[0].link.url) }) : null) : this.setState({ NYTReview: this.state.NYTReview.concat('') })
                }).catch((error2) => {
                    console.log(error2);
                });
                movieAPI.sleep(1000);
            }
        }).catch((error) => {
            console.log(error);
        });
    } 

    render () {
        const MOVIE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
        const { data } = this.state;
        const items = 
            data 
                ? 
            data.map((item, index) => 
                { 
                    var rating = item.vote_count === 0 ? "No ratings yet!" : item.vote_average + `/10 (` + item.vote_count + `)`
                    return (
                        <div className="card" key={index}>
                            <MuiThemeProvider>
                            <Card>
                                <CardHeader
                                    title={item.title}
                                    subtitle={item.release_date}
                                    avatar={item.poster_path ? MOVIE_IMAGE_URL + item.poster_path : "http://mattislist.com/marketingapp/postimage/noimageavailable.png"}
                                    actAsExpander={true}
                                    showExpandableButton={true}
                                />
                                <CardText>
                                    <b>Average Rating: </b>{rating}
                                    <br />
                                    <br />
                                    <b>Description: </b>{item.overview ? item.overview : "No description available."}
                                </CardText>
                                {/* Had difficulty finding an API that returned plain text movie reviews as opposed to links */}
                                <CardText expandable={true}>
                                    {
                                        this.state.NYTReview[index] ? <a target="_blank" href={this.state.NYTReview[index]}>New York Times Review</a> : <p>No New York Times review available</p>
                                    }
                                </CardText>
                            </Card>
                            </MuiThemeProvider>
                        </div>
                    ) 
                }) 
                :
            <p>No content available.</p>
        var title = !this.props.auto ? "Showing search results for " + this.props.searchQuery + ":" : "Top 20 Trending Movies:";
        return (
            <div>
                <div className="container">
                    <div className="header">
                        <h1 className="title">{title}</h1>
                        <BackButton back={this.props.back} />
                    </div>
                    {/* Also had difficulty setting up search bar to re-render new search results on the results page (similar to how Google does it) */}
                    <div className="content">
                        {items}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default QuerySearchResults;