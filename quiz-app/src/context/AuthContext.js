import createDataContext from './createDataContext';

import quizApi from '../api/quiz'

import { AsyncStorage } from 'react-native';

import { navigate } from '../nagivationRef'


const authReducer = (state, action) => {

    if (action.type == 'add_error') {
        return { ...state, errorMessage: action.payload };
    }

    if (action.type == 'signup' || action.type == 'signin') {
        return { errorMessage: '', token: action.payload.token, accountType: action.payload.accountType };
    }

    if (action.type == 'clear_error_message') {
        return { ...state, errorMessage: '' };
    }

    if (action.type == 'signout') {
        return { token: null, errorMessage: '' };
    }

    return state;
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    const accountType = await AsyncStorage.getItem('accountType');

    if (token) {
        //account type
        dispatch({ type: 'signin', payload: token })

        //update navigation depends on the account type -- maker / taker
        // 1 == maker
        // 2 == taker
        if (accountType == 1) {
            navigate('makerFlow');
        } else if (accountType == 2) {
            navigate('takerFlow')
        }
    } else {
        navigate('Signup')
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message' });
};

const signup = (dispatch) => async ({ email, password }) => {
    try {
        if (email && password) {
            const response = await quizApi.post('/signup', { email, password, accountType: 2 });
            const token = response.data.token;
            const accountType = response.data.accountType;
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('accountType', accountType.toString());
            dispatch({ type: 'signup', payload: { token, accountType } });

            if (accountType === 1) {
                navigate('makerFlow');
            } else if (accountType === 2) {
                navigate('takerFlow')
            }
        } else {
            dispatch({ type: 'add_error', payload: 'Email and Password are required' });
        }
    } catch (err) {
        dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' });
    };
};

const signin = (dispatch) => async ({ email, password }) => {
    try {
        if (email && password) {
            const response = await quizApi.post('/signin', { email, password });
            const token = response.data.token;
            const accountType = response.data.accountType;
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('accountType', accountType.toString());
            dispatch({ type: 'signin', payload: { token, accountType } });

            if (accountType == 1) {
                navigate('makerFlow');
            } else if (accountType == 2) {
                navigate('takerFlow')
            }
        } else {
            dispatch({ type: 'add_error', payload: 'Email and Password are required' });
        }
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Incorrect Email or Password'
        })
    }
}

const signout = (dispatch) => async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('accountType');
    dispatch({ type: 'signout' });
    navigate('loginFlow');
}

export const { Provider, Context } = createDataContext(
    authReducer,
    {
        tryLocalSignin,
        signin,
        signout,
        signup,
        clearErrorMessage
    },
    { token: null, accountType: '', errorMessage: '' }
);