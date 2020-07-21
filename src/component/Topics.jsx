import React, { Component } from 'react';
import { Button, Icon, Input, Label, List, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addTopic, deleteTopic, fetchTopics, votedUnVoted } from '../store/actions/topicActions';
import '../style.css';

class Topics extends Component {
    state = {
        topic: '',
        error: false,
        loading: false
    };

    componentDidMount() {
        this.props.fetchTimes();
        this.forceUpdate();

    }

    handleChange = (event) => {
        this.setState({ topic: event.target.value });
    };

    handleAdd = () => {
        const topic = this.state.topic;
        if (this.state.topic !== '') {
            this.setState({ topic: '', error: false });
            this.props.addTopic({ 'title': topic });
        } else {
            this.setState({ error: true });
        }
    };
    handleDelete = (id, canDelete) => {
        this.setState({ loading: true });
        if (canDelete) {
            return this.props.deleteTopic({ id }).then(() => {
                this.setState({ loading: false });
            });
        }
        this.setState({ error: true });

    };
    handleVoted = (id, votedByMe) => {
        this.setState({ error: false });
        const votedByMeBool = !votedByMe;
        let voted = '';
        if (votedByMeBool) {
            voted = 'like';
        } else {
            voted = 'unlike';
        }
        this.props.votedUnVoted({ id, type: voted });
    };


    render() {
        let errors = [];
        if (this.props.error) {
            errors.push(this.props.error);
        }
        if (this.state.error) {
            errors.push('You can\'t delete this topic');
        }
        const { topics } = this.props;

        return (

            <List divided verticalAlign='middle'>
                <List.Item>
                    <h2>Topics</h2>
                </List.Item>
                {errors.length !== 0 && <Message
                    error
                    color='red'
                    list={
                        errors.map((error, index) => (
                            <span key={index}>{error}</span>
                        ))
                    }
                />}

                <Input
                    style={{ margin: '14px 0px' }}
                    action
                    fluid
                    value={this.state.topic}
                    onChange={this.handleChange}
                    placeholder='Add Topic'
                >
                    <input/>
                    <Button
                        type='submit'
                        onClick={this.handleAdd}
                    >
                        Add Topic
                    </Button>
                </Input>
                {topics &&
                topics.map(topic => (
                    <List.Item key={topic.id}>
                        <List.Content floated='right'>
                            {topic.canDelete &&
                            <Button
                                loading={this.state.loading}
                                icon
                                onClick={() => this.handleDelete(topic.id, topic.canDelete)}
                            >
                                <Icon name='delete'/>
                            </Button>
                            }
                            <Button as='div' labelPosition='right'>
                                <Button
                                    color={topic.votedByMe ? 'red' : 'grey'}
                                    icon
                                    onClick={() => this.handleVoted(topic.id, topic.votedByMe)}
                                >
                                    <Icon name='heart'/>
                                    Like
                                </Button>
                                <Label style={{width: '43px'}} as='a' basic pointing='left'>
                                    {topic.votingsCount}
                                </Label>
                            </Button>
                        </List.Content>
                        <List.Content>{topic.title}</List.Content>
                    </List.Item>
                ))}

            </List>

        );
    }

}

function mapStateToProps(state) {
    const { topics, topic, error } = state.topics;

    return { topics, topic, error };
}

const mapDispatchToProps = {
    fetchTimes: fetchTopics,
    addTopic: addTopic,
    deleteTopic: deleteTopic,
    votedUnVoted: votedUnVoted

};

export default connect(mapStateToProps, mapDispatchToProps)(Topics);