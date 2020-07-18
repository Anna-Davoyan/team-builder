import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {Menu} from 'semantic-ui-react'

class Main extends Component {
    render() {
        return (
            <div>
                <Menu pointing secondary>

                    <Menu.Item
                        name='home'
                        as={NavLink}
                        to='/'
                    />

                    <Menu.Item
                        name='login'
                        as={NavLink}
                        to={'/auth/login'}
                    />

                    <Menu.Item
                        name='register'
                        as={NavLink}
                        to={'/auth/register'}
                    />

                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='logout'
                        />
                    </Menu.Menu>
                </Menu>


            </div>
        )
    }

}

export default Main;