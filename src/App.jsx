import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './component/Login';
import Registration from './component/Registration';
import Main from './component/Main';
import Menu from './component/Menu';

class App extends Component {
    render() {
        return (
            <>
                <Menu/>
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