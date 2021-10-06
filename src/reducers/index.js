import { combineReducers } from 'redux';
import * as actionTypes from '../actions/types';

const initialUserState = {
    currentUser: null,
    isLoading: true
};

const intialCache = {
    userList: [],
    isLoading: true
}

const initialChannelState = {
    currentChannel: null,
    isPrivateChannel: false
};

const initilaColorsSate = {
    primaryColor: '#201d38',
    secondaryColor: '#8244FF'
}

const user_reducer = (state = initialUserState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                currentUser: action.payload.currentUser,
                isLoading: false
            };
        case actionTypes.CLEAR_USER:
            return {
                ...state,
                isLoading: false
            }
        case actionTypes.CACHE_USER_DATA:
            return {
                ...state,

            }
        default:
            return state;
    }
}

const user_cache_reducer = (state = intialCache, action) => {
    switch (action.type) {
        case actionTypes.CACHE_USER_DATA:
            return {
                ...state,
                userList: action.payload.userList
            }
        default:
            return state;
    }
}

const channel_reducer = (state = initialChannelState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_CHANNEL:
            return {
                ...state,
                currentChannel: action.payload.currentChannel
            }
        case actionTypes.SET_PRIVATE_CHANNEL:
            return {
                ...state,
                isPrivateChannel: action.payload.isPrivateChannel
            }
        case actionTypes.SET_USER_POSTS:
            return {
                ...state,
                userPosts: action.payload.userPosts
            }
        default:
            return state;
    }
}

const color_reducer = (state = initilaColorsSate, action) => {
    switch (action.type) {
        case actionTypes.SET_COLORS:
            return {
                primaryColor: action.payload.primaryColor,
                secondaryColor: action.payload.secondaryColor
            }
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    user: user_reducer,
    channel: channel_reducer,
    colors: color_reducer,
    userCache: user_cache_reducer
});

export default rootReducer;