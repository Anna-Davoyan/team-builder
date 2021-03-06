
import { BASE_URL } from './constants';

class ApiHelper {

    constructor() {
        this.token = localStorage.getItem('token') || sessionStorage.getItem('token');
    }

    setToken(token) {
        this.token = token;
    }

    fetchUser() {
        return fetch(BASE_URL + '/api/v1/users', {
            headers: {
                'token': this.token,
                'Content-Type': 'application/json'
            }
        });
    }

    userLogin(userData) {
        return fetch(BASE_URL + '/api/v1/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
    }

    registerUser(data) {
        return fetch(BASE_URL + '/api/v1/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    updateUser(userData) {
        return fetch(BASE_URL + '/api/v1/users/update', {
            method: 'PUT',
            headers: {
                'token': this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
    }

    fetchTopic() {
        return fetch(BASE_URL + '/api/v1/topics', {
            headers: {
                'token': this.token,
                'Content-Type': 'application/json'
            }
        });
    }

    addTopic(topic) {
        return fetch(BASE_URL + '/api/v1/topics', {
            method: 'POST',
            headers: {
                'token': this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(topic)

        });
    }

    deleteTopic(id) {
        return fetch(BASE_URL + '/api/v1/topics/' + id.id, {
            method: 'DELETE',
            headers: {
                'token': this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        });
    }

    votedUnVoted(data) {
        return fetch(BASE_URL + `/api/v1/topics/${data.id}/voting`, {
            method: 'POST',
            headers: {
                'token': this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    fetchProjects() {
        return fetch(BASE_URL + '/api/v1/projects', {
            headers: {
                'token': this.token,
                'Content-Type': 'application/json'
            }
        });

    }

    projectVotedUnVoted(data) {
        return fetch(BASE_URL + `/api/v1/projects/${data.id}/voting`, {
            method: 'POST',
            headers: {
                'token': this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }


    fetchTeams() {
        return fetch(BASE_URL + '/api/v1/teams', {
            headers: {
                'token': this.token,
                'Content-Type': 'application/json'
            }
        });
    }

    logout() {
        return fetch(BASE_URL + '/api/v1/users/logout', {
            headers: {
                'token': this.token,
                'Content-Type': 'application/json'
            }
        });
    }

}

export default new ApiHelper();