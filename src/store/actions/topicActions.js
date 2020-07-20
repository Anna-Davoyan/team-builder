import apiHelper from '../../helpers/apiHelper';
import {
    ADD_TOPICS_FAILURE,
    ADD_TOPICS_SUCCESS,
    DELETE_TOPIC_FAILURE,
    DELETE_TOPIC_SUCCESS,
    TOPICS_FETCH_FAILURE,
    TOPICS_FETCH_SUCCESS, VOTED_FAILURE, VOTED_SUCCESS
} from './actionTypes';

export const fetchTopics = () => (dispatch) => {
    return apiHelper.fetchTopic().then(response => {
        return response.json().then(data => {
            dispatch({
                type: TOPICS_FETCH_SUCCESS,
                payload: data
            });
        });
    }).catch((error) => {
        console.error(error);
        dispatch({
            type: TOPICS_FETCH_FAILURE,
            error: 'Failed to load topics'
        });
    });
};

export const addTopic = (topic) => (dispatch) => {

    return apiHelper.addTopic(topic).then(response => {
        if (response.status !== 200) {
            dispatch({
                type: ADD_TOPICS_FAILURE,
                error: 'Incorrect Topic'
            });
            return null;
        }
        return response.json().then(responseData => {
            dispatch({
                type: ADD_TOPICS_SUCCESS,
                payload: responseData
            });
            return responseData;
        });
    }).catch((error) => {
        console.error(error);
    });

};

export const deleteTopic = (id) => (dispatch) => {

    return apiHelper.deleteTopic(id).then(response => {
        if (response.status !== 200) {
            dispatch({
                type: DELETE_TOPIC_FAILURE,
                error: 'Something went wrong'
            });
            return null;

        }
        return response.text().then(responseData => {
            dispatch({
                type: DELETE_TOPIC_SUCCESS,
                payload: id
            });
            return responseData;
        });
    }).catch((error) => {
        console.error(error);
    });

};

export const votedUnVoted = (data) => (dispatch) => {
    return apiHelper.votedUnVoted(data).then(response=>{
        if (response.status !== 200) {
            dispatch({
                type: VOTED_FAILURE,
                error: 'Something went wrong'
            });
            return null;

        }
        return response.json().then(responseData => {
            dispatch({
                type: VOTED_SUCCESS,
                payload: responseData
            });
            return responseData;
        });
    }).catch((error) => {
        console.error(error);
    });
};
