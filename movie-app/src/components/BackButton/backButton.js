import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Reply from 'material-ui/svg-icons/content/reply';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class BackButton extends Component {
    constructor(props) {
      super(props);
    }
    render () {
        const styles = {
            button: {
              margin: 25,
              position: 'fixed',
              top: 0,
              right: 0
            }
          };
        return (
            <MuiThemeProvider>
                <RaisedButton
                    label="Back"
                    labelPosition="before"
                    secondary={true}
                    icon={<Reply />}
                    style={styles.button}
                    onClick={this.props.back}
                />
            </MuiThemeProvider>
        );
    }
}

export default BackButton;