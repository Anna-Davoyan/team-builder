import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { fetchUser } from '../store/actions/userActions';
import Teams from './Teams';
import UserProfile from './UserProfile';
import Topics from './topics/Topics';
import Projects from './Projects';

class Main extends Component {

    state = { loading: false };

    componentDidMount() {
        const { userData, token } = this.props;

        if (token && !userData) {
            // this.setState({loading:true})
            this.props.fetchUser();
        }
    }

    render() {
        const { userData, token } = this.props;

        if (!token) {
            return <Redirect to="/auth/login"/>;
        }

        if (this.state.loading) {
            return <p>....loading</p>;
        }

        if (userData) {
            return (

                <Switch>
                    <Route exact path="/teams" component={Teams}/>
                    <Route exact path="/user/profile" component={UserProfile}/>
                    <Route exact path="/topics" component={Topics}/>
                    <Route exact path="/projects" component={Projects}/>
                    <Redirect to="/teams"/>
                </Switch>
            );
        }

        return <div></div>;
    }

}

Main.propTypes = {
    fetchUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    return {
        token,
        userData: state.user.userData
    };
};

const mapDispatchToProps = {
    fetchUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);