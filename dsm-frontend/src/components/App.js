import React, { Component } from 'react';
import { List } from 'semantic-ui-react'
import { Link } from "react-router-dom";


// CSS
import 'semantic-ui-css/semantic.min.css'




class App extends Component {
    render() {
        return (
            <List bulleted>
                <List.Item as={Link} to="/login">Login Page</List.Item>
                <List.Item as={Link} to="/home">Home Page</List.Item>
            </List>
        );
    }
}

export default App;
