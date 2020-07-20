import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Menu as SemanticMenu } from 'semantic-ui-react';
import { logout } from '../store/actions/userActions';


class Menu extends Component {

    handleLogout = () => {
        this.props.logout();
    };


    render() {
        const { user } = this.props;

        return (
            <SemanticMenu pointing secondary>

                <SemanticMenu.Item
                    name='home'
                    as={NavLink}
                    to='/'
                />

                {!user && (
                    <>
                        <SemanticMenu.Item
                            name='login'
                            as={NavLink}
                            to={'/auth/login'}
                        />

                        <SemanticMenu.Item
                            name='register'
                            as={NavLink}
                            to={'/auth/register'}
                        />
                    </>
                )}


                {user && (
                    <>
                        <SemanticMenu.Item
                            name='Topics'
                            as={NavLink}
                            to={'/topics'}
                        />
                        <SemanticMenu.Item
                            name='Projects'
                            as={NavLink}
                            to={'/projects'}
                        />
                        <SemanticMenu.Menu position='right'>
                            <SemanticMenu.Item
                                name='logout'
                                onClick={this.handleLogout}
                            />
                        </SemanticMenu.Menu>
                    </>
                )}

            </SemanticMenu>
        );
    }
}

Menu.propTypes = {
    logout: PropTypes.func.isRequired,
    user: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        user: state.user.userData
    };
};

const mapDispatchToProps = {
    logout
};


export default connect(mapStateToProps, mapDispatchToProps)(Menu);