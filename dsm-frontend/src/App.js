import React, { Component } from 'react';

// REDUX
import {Provider as StoreProvider} from 'react-redux';
import store  from './redux/store';

// CSS
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import logo from './logo.svg';


class App extends Component {
    render() {
        return (
            <StoreProvider store={store}>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <p>
                            Edit <code>src/App.js</code> and save to reload.
                        </p>
                        <a
                            className="App-link"
                            href="https://reactjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Learn React
                        </a>
                    </header>
                </div>
            </StoreProvider>
        );
    }
}

export default App;
