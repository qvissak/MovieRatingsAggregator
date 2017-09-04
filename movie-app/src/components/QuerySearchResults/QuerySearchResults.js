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
        allReviews: []
      }
    }

    // Load API data from both sources into states
    componentWillMount() {
        var response = !this.props.auto ? movieAPI.getSearchResults(this.props.searchQuery) : movieAPI.getPopularResults();
        response.then((res) => {
            var local = []
            for (var i = 0; i < res.results.length; i++){
                var reviews = movieAPI.getReviews(res.results[i].id);
                reviews.then((res2) => {
                    if (res2) {
                        var temp = []
                        for (var j = 0; j < res2.results.length; j++){
                             temp.push({ author: res2.results[j].author, content: res2.results[j].content })
                        }
                        local.push(temp);
                    }
                });
            }
            this.setState({ allReviews: local })
            if (res) this.setState({ data: this.state.data.concat(res.results) });            
        }).catch((error) => {
            console.log(error);
        });
    } 

    render () {
        const MOVIE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
        const { data, allReviews } = this.state;
        console.log(allReviews)
        console.log(allReviews.length)
        const items = 
            data 
                ? 
            data.map((item) => 
                { 
                    var rating = item.vote_count === 0 ? "No ratings yet!" : item.vote_average + `/10 (` + item.vote_count + `)`;
                    var reviewContent = 
                        allReviews.map((review, index) => {
                            return (
                                <div key={index}>
                                    <b>Author: </b>{review[index].author}
                                    <b>Review: </b>{review[index].content}
                                </div>
                            )
                        })
                    // console.log(reviewContent);
                    return (
                        <div className="card" key={item.title}>
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
                                <CardText expandable={true}>
                                    {reviewContent}
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