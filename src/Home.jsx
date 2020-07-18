import React, {Component} from 'react';
import { Route, Switch} from 'react-router-dom'
import Login from "./component/Login";
import Registration from "./component/Registration";
import Header from "./component/Header";
import Main from "./component/Main";

class Home extends Component {
    render() {
        return (
            <>
                <Header/>
                <div className='wrapper'>
                    <Switch>
                        <Route exact path="/" component={Main}/>
                        <Route exact path="/auth/login" component={Login}/>
                        <Route exact path="/auth/register" component={Registration}/>
                        <Route exact path="/user/profile"/>
                    </Switch>

                </div>
            </>
        )
    }

}

export default Home;