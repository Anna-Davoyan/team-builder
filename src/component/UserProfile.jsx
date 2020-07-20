import React, { Component } from 'react';
import { Button, Form, Grid, Image,Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { fetchCompanies } from '../store/actions/companiesActions';
import { updateUser } from '../store/actions/userActions';

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.userData = this.props.userData;
        this.state = {
            form: {
                email: this.userData.email,
                firstName: this.userData.firstName,
                lastName: this.userData.lastName,
                birthDate: moment(this.userData.birthDate).format('YYYY-MM-DD'),
                avatarUrl: this.userData.avatarUrl,
                companyId: this.userData.companyId,
                jsExperience: this.userData.jsExperience,
                reactExperience: this.userData.reactExperience,
                sex: this.userData.sex
            },
            emptyFieldsError: false,
            loading:false
        };

    }

    componentDidMount() {
        this.props.fetchCompanies();
    }


    handleChange = (event) => {
        const form = { ...this.state.form };
        form[event.target.name] = event.target.value;
        this.setState({ form });
    };

    handleChangeDate = date => {
        const form = { ...this.state.form };
        form.birthDate = moment(date).format('YYYY-MM-DD');
        this.setState({
            form
        });
    };

    handleUpdate = () => {
        let { form } = this.state;
        if (form.firstName === '' || form.lastName === ''
            || form.email === ''
            || form.avatarUrl === '' || form.companyId === ''
            || form.jsExperience === '' || form.reactExperience === '' || form.sex === ''
        ) {
            return this.setState({ emptyFieldsError: true });
        }


        this.setState({loading: true, emptyFieldsError: false });
        this.props.updateUser(form).then(user=>{
            this.setState({ loading: false });
        });
    };


    render() {

        let errors = [];
        if (this.state.emptyFieldsError) {
            errors.push('Missing required Fields.');
        }
        if (this.props.error) {
            errors.push(this.props.error);
        }

        const { form } = this.state;
        let companyOptions = [];
        if (this.props.companies) {
            this.props.companies.forEach(element => {
                companyOptions = [
                    ...companyOptions,
                    { key: element.id, value: element.id, text: element.name }
                ];
            });
        }
        const genderOptions = [
            { key: 'male', value: 'male', text: 'Male' },
            { key: 'female', value: 'female', text: 'Female' }
        ];

        return (
            <Grid>
                <Grid.Column width={4}>
                    <Image src={form.avatarUrl}/>
                </Grid.Column>
                <Grid.Column width={9}>


                    <Form size='large'>

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
                                    <span className='datePickerLabel'>Birth Date</span>
                                    <DatePicker
                                        selected={moment(form.birthDate).toDate()}
                                        onChange={this.handleChangeDate}
                                        placeholderText="Click to select a date"
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

                                    <Button
                                        loading={this.state.loading}
                                        className='sendButton'
                                        onClick={this.handleUpdate}
                                        color='teal'
                                        fluid
                                        size='large'
                                    >
                                        Update
                                    </Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form>
                </Grid.Column>
            </Grid>

        );
    }
}

function mapStateToProps(state) {

    const { companies } = state.companies;
    const { userData } = state.user;
    return { companies, userData };

}

const mapDispatchToProps = {
    fetchCompanies: fetchCompanies,
    updateUser: updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);