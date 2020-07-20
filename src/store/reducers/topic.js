import {
    ADD_TOPICS_FAILURE,
    ADD_TOPICS_SUCCESS,
    DELETE_TOPIC_FAILURE,
    DELETE_TOPIC_SUCCESS,
    TOPICS_FETCH_FAILURE,
    TOPICS_FETCH_SUCCESS,
    VOTED_FAILURE,
    VOTED_SUCCESS
} from '../actions/actionTypes';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {

    switch (action.type) {
        case TOPICS_FETCH_SUCCESS:
            return { ...state, topics: action.payload, error: undefined };
        case TOPICS_FETCH_FAILURE:
            return { ...state, error: action.error, topics: [] };

        case ADD_TOPICS_SUCCESS:
            const oldTopics = state.topics;
            return { ...state, topics: [action.payload, ...oldTopics] };
        case ADD_TOPICS_FAILURE:
            return { ...state, error: action.error };

        case DELETE_TOPIC_SUCCESS:
            const newTopics = state.topics.filter(i => i.id !== action.payload.id);
            return { ...state, topics: newTopics };
        case DELETE_TOPIC_FAILURE:
            return { ...state, error: action.error };

        case VOTED_SUCCESS:
            const topics = state.topics.map(topic => {
                if (topic.id === action.payload.id) {
                    topic.votedByMe = !topic.votedByMe;
                    if (topic.votedByMe) {
                        topic.votingsCount = topic.votingsCount + 1;
                    } else {
                        topic.votingsCount = topic.votingsCount - 1;
                    }
                    return topic;
                }
                return topic;
            });

            return { ...state, topics: topics };
        case VOTED_FAILURE:
            return { ...state, error: action.error };


        default:
            return state;
    }
}