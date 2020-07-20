import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './component/Login';
import Registration from './component/Registration';
import Header from './component/Header';
import Main from './component/Main';

class App extends Component {
    render() {
        return (
            <>
                <Header/>
                <div className='wrapper'>
                    <Switch>
                        <Route exact path="/auth/login" component={Login}/>
                        <Route exact path="/auth/register" component={Registration}/>
                        <Route path="/" component={Main}/>
                        <Redirect to="/"/>
                    </Switch>
                </div>
            </>
        );
    }

}

export default App;