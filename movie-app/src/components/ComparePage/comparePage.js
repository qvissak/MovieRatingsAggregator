import React, { Component } from 'react';
import Footer from '../Footer/footer';
import BackButton from '../BackButton/backButton';

class ComparePage extends Component {
    constructor(props){
        super(props);
    }
    render () {
        return (
            <div>
                <div className="container">
                    <div className="header">
                        <h1 className="title">Compare</h1>
                        <BackButton back={this.props.back} />
                    </div>
                    <div className="content">
                        
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default ComparePage;