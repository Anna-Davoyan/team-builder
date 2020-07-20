import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { userLogin } from '../store/actions/authActions';


class Login extends Component {
    state = {
        email: '',
        password: '',
        error: false,
        remember: false,
        loading: false
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    onChangeCheck = () => {
        this.setState({ remember: !this.state.remember });
    };


    onLoginClickHandler = () => {
        const userInfo = this.state;

        if (userInfo.email === '' || userInfo.password === '') {
            return this.setState({ error: true });
        }

        this.setState({ loading: true, error: false });

        this.props.userLogin(userInfo, this.state.remember).then(user => {
            this.setState({ loading: false });

            if (user) {
                this.props.history.push('/user/profile');
            }
        });
    };

    render() {
        let errors = [];

        if (this.state.error) {
            errors.push('Missing required Fields.');
        }
        if (this.props.error) {
            errors.push(this.props.error);
        }
        return (
            <Form size='large'>
                <Header as='h2' color='teal' textAlign='center'>
                    Log-in to your account
                </Header>

                <Grid textAlign='center' verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Message
                            error={!errors.length}
                            color='red'
                            list={
                                errors.map((error, index) => (
                                    <span key={index}>{error}</span>
                                ))
                            }
                        />
                        <Form.Input
                            name='email'
                            fluid
                            icon='mail'
                            iconPosition='left'
                            value={this.state.email}
                            placeholder='E-mail address'
                            onChange={this.handleChange}
                        />
                        <Form.Input
                            name='password'
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            value={this.state.password}
                            type='password'
                            onChange={this.handleChange}
                        />
                        <Form.Checkbox
                            name='remember'
                            label='Remember me'
                            defaultChecked={this.state.remember}
                            onChange={this.onChangeCheck}
                        />
                        <Button
                            loading={this.state.loading}
                            color='teal'
                            fluid
                            size='large'
                            onClick={this.onLoginClickHandler}>
                            Login
                        </Button>
                    </Grid.Column>
                </Grid>
            </Form>
        );
    }
}

function mapStateToProps(state) {
    return { error: state.auth.loginError };
}

const mapDispatchToProps = {
    userLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);