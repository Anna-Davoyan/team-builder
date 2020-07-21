import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchTeams } from '../store/actions/teamsActions';

class Teams extends Component {
    componentDidMount() {
        this.props.fetchTeams();
    }

    render() {
        const { teams } = this.props;
        return (
            <Table celled  fixed>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell >Topic</Table.HeaderCell>
                        <Table.HeaderCell >Project</Table.HeaderCell>
                        <Table.HeaderCell>Members</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {teams &&
                    teams.map(team => (
                        <Table.Row key={team.id}>
                            <Table.Cell>{team.name}</Table.Cell>
                            <Table.Cell>{team.topic}</Table.Cell>
                            <Table.Cell>{team.project}</Table.Cell>
                            <Table.Cell>{team.members.map((member,index) => (
                                <p key={index}>{member.firstname}  {member.lastName}</p>
                            ))}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        );
    }
}

function mapStateToProps(state) {
    const { teams } = state.teams;
    return {
        teams
    };
}


const mapDispatchToProps = {
    fetchTeams: fetchTeams
};


export default connect(mapStateToProps, mapDispatchToProps)(Teams);