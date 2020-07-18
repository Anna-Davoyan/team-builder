import React, {Component} from "react";
import {Button, Form, Grid, Header, Message} from 'semantic-ui-react'
import {connect} from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {fetchCompanies, registerUser} from '../actions/authActions';
import moment from 'moment'


class Registration extends Component {
    state = {
        form: {
            email: `wdewfew${Date.now()}@gmail.com`,
            password: "loveHarut4ever",
            confirmPass: "loveHarut4ever",
            firstName: "aaa",
            lastName: "aaayan",
            birthDate: moment().format('YYYY-MM-DD'),
            avatarUrl: "https://www.google.com/search?q=img&sxsrf=ALeKk03QlzAjOhrZtrnheCDjoecUys8F8g:1594910562040&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiBwf7rgNLqAhVKxIUKHRx5CNUQ_AUoAXoECBsQAw&biw=1440&bih=703#imgrc=RYBz6TYw2D7ZZM",
            companyId: 1,
            jsExperience: 1,
            reactExperience: 1,
            sex: "male"
        },
        confirmPasswordError: false,
        passwordError: false,
        emptyFieldsError: false,
    };

    componentDidMount() {
        this.props.companiesFetched();
    }


    handleChange = (event) => {
        const form = {...this.state.form};
        form[event.target.name] = event.target.value;
        this.setState({form})
    };

    handleSelectChange = (event, data) => {
        const form = {...this.state.form};
        form[data.name] = data.value;
        this.setState({
            form
        })
    };

    handleChangeDate = date => {
        const form = {...this.state.form};
        form.birthDate = moment(date.birthDate).format('YYYY-MM-DD');
        this.setState({
            form
        });
    };

    handleSignUp = () => {
        let {form} = this.state;
        if (form.firstName === "" || form.lastName === ""
            || form.email === "" || form.password === ""
            || form.avatarUrl === "" || form.companyId === ""
            || form.jsExperience === "" || form.reactExperience === "" || form.sex === ""
        ) {
            return this.setState({emptyFieldsError: true});
        }

        if (form.confirmPass !== form.password) {
            return this.setState({confirmPasswordError: true, passwordError: false, emptyFieldsError: false});
        }

        const passw = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!form.password.match(passw)) {
            return this.setState({passwordError: true, emptyFieldsError: false});
        }

        this.setState({confirmPasswordError: false, passwordError: false, emptyFieldsError: false});
        this.props.onAddUser(form, this.props.history)
    };


    render() {

        let errors = [];
        if (this.state.emptyFieldsError) {
            errors.push("Missing required Fields.");
        }
        if (this.state.passwordError) {
            errors.push("Password must have Minimum eight characters, at least one letter and one number.");
        }
        if (this.state.confirmPasswordError) {
            errors.push("Password are not matching.")
        }
        if (this.props.error) {
            errors.push(this.props.error)
        }
        const {form} = this.state;
        let companyOptions = [];
        if (this.props.companies) {
            this.props.companies.forEach(element => {
                companyOptions = [
                    ...companyOptions,
                    {key: element.id, value: element.id, text: element.name}
                ]
            });
        }
        const genderOptions = [
            {key: 'male', value: 'male', text: 'Male'},
            {key: 'female', value: 'female', text: 'Female'}
        ];
        return (

            <Form size='large'>
                <Header as='h2' color='teal' textAlign='center'>
                    New account
                </Header>

                {errors.length !== 0 &&
                <Message negative>
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </Message>
                }

                <Grid columns={2} container divided stackable>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Input
                                name='firstName'
                                fluid
                                value={form.firstName}
                                onChange={this.handleChange}
                                label='First name'
                            />
                            <Form.Select
                                fluid
                                options={genderOptions}
                                value={form.sex}
                                onChange={this.handleSelectChange}
                                name='sex'
                                label='Gender'
                            />
                            <Form.Input
                                name="email"
                                fluid
                                value={form.email}
                                onChange={this.handleChange}
                                label='E-mail address'
                            />
                            <Form.Input
                                name='jsExperience'
                                type='number'
                                fluid
                                label='Js Experience'
                                value={form.jsExperience}
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                fluid
                                name='password'
                                label='Password'
                                type='password'
                                value={form.password}
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                fluid
                                name='confirmPass'
                                value={form.confirmPass}
                                label='Confirm password'
                                type='password'
                                onChange={this.handleChange}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Input
                                name='lastName'
                                fluid
                                label='Last name'
                                value={form.lastName}
                                onChange={this.handleChange}
                            />
                            <Form.Select
                                fluid
                                label='Company'
                                options={companyOptions}
                                value={parseInt(form.companyId)}
                                onChange={this.handleSelectChange}
                                name='companyId'

                            />
                            <Form.Input
                                name='avatarUrl'
                                fluid
                                label='Avatar URL'
                                value={form.avatarUrl}
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                name='reactExperience'
                                fluid
                                type='number'
                                label='React Experience'
                                value={form.reactExperience}
                                onChange={this.handleChange}
                            />
                            <span className='datePickerLabel'>Birth Date</span>
                            <DatePicker
                                selected={moment(form.birthDate).toDate()}
                                onChange={this.handleChangeDate}
                                placeholderText="Click to select a date"
                            />

                            <Button
                                className='sendButton'
                                onClick={this.handleSignUp}
                                color='teal'
                                fluid
                                size='large'
                            >
                                Sign Up
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>

        )
    }
}

function mapStateToProps(state) {
    const {userInfo} = state.userRegister;
    const {companies} = state.companies;
    const {error} = state.userRegister;
    return {companies, error, userInfo}
}

const mapDispatchToProps = (dispatch) => {
    return {
        companiesFetched: () => dispatch(fetchCompanies()),
        onAddUser: (userInfo, history) => dispatch(registerUser(userInfo, history))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);