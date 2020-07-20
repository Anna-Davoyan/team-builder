import { combineReducers } from 'redux';
import auth from './auth';
import company from './company';
import user from './user';
import topic from './topic';
import projects from './projects';
import teams from './teams';

const rootReducer = combineReducers({
    auth: auth,
    companies: company,
    user: user,
    topics: topic,
    projects: projects,
    teams: teams
});

export default rootReducer;