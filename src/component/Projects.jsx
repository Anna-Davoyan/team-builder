import React, { Component } from 'react';
import { Button, Icon, Label, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchProjects, projectVotedUnVoted } from '../store/actions/projectsActions';

class Projects extends Component {
    componentDidMount() {
        this.props.fetchProjects();
    }

    handleVoted = (id, votedByMe) => {
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
        const { projects } = this.props;
        return (
            <Table celled fixed singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell/>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {projects &&
                    projects.map(project => (
                        <Table.Row key={project.id}>
                            <Table.Cell>{project.title}</Table.Cell>
                            <Table.Cell>{project.description}</Table.Cell>
                            <Table.Cell>
                                <Button as='div' labelPosition='right'>
                                    <Button
                                        color={project.votedByMe ? 'red' : 'grey'}
                                        icon
                                        onClick={() => this.handleVoted(project.id, project.votedByMe)}
                                    >
                                        <Icon name='heart'/>
                                        Like
                                    </Button>
                                    <Label style={{width: '43px'}} as='a' basic pointing='left'>
                                        {project.votingsCount}
                                    </Label>
                                </Button>

                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        );
    }
}

function mapStateToProps(state) {
    const { projects } = state.projects;

    return {
        projects
    };
}


const mapDispatchToProps = {
    fetchProjects: fetchProjects,
    votedUnVoted: projectVotedUnVoted
};


export default connect(mapStateToProps, mapDispatchToProps)(Projects);