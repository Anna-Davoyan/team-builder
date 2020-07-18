import React, {Component} from "react";
import {Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {registerUser} from "../actions/authActions";


class Login extends Component {
    state={
        login:'',
        password:'',
    };

    handleChange = (event) => {
        event.target.name = event.target.value;
        this.setState({
            [event.target.name]: event.target.value
        })

    };

    onClickHandler = () => {
        const userInfo = this.state;
        this.props.userLogin(userInfo,this.props.history);
    };

    render() {
        return (
            <>
                <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Log-in to your account
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon='mail'
                                    iconPosition='left'
                                    placeholder='E-mail address'
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    onChange={this.handleChange}
                                />
                                <Form.Checkbox label='Remember me'/>
                                <Button color='teal' fluid size='large' onClick={this.onClickHandler}>
                                    Login
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                            New to us? <Link to='/auth/register'>Sign Up</Link>
                        </Message>
                    </Grid.Column>
                </Grid>

            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLogin: (userInfo, history) => dispatch(registerUser(userInfo, history))
    }
};

export default connect(null, mapDispatchToProps)(Login);