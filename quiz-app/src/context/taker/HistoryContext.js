import createDataContext from '../createDataContext'
import quizApi from '../../api/quiz';

const historyReducer = (state, action) => {

    if (action.type == 'get_history') {
        return {
            ...state,
            historyList: action.payload,
            loaded: true
        }
    }

    if (action.type == 'delete_history') {
        return {
            ...state,
            historyList: [],
            loaded: true
        }
    }

    if (action.type == 'unload') {
        return {
            ...state,
            loaded: false
        }
    }

    return state
};

//DISPATCH FUNCTIONS
const saveHistory = dispatch => async (data) => {
    try {
        const { quizTitle, score, remarks } = data;
        await quizApi.post('/saveHistory', { quizTitle, score, remarks });
    } catch (err) {
        console.log(err)
    }
}

const deleteHistory = dispatch => async () => {
    try {
        await quizApi.post('/deleteHistory');
        dispatch({ type: 'delete_history' })
    } catch (err) {
        console.log(err)
    }
}

const getHistory = dispatch => async () => {
    try {
        const response = await quizApi.get('/history');
        dispatch({ type: 'get_history', payload: response.data });
    } catch (err) {
        console.log(err)
    }
}

const unload = dispatch => () => {
    dispatch({ type: 'unload' })
};

export const { Context, Provider } = createDataContext(
    historyReducer,
    {
        saveHistory,
        deleteHistory,
        getHistory,
        unload
    },
    {
        historyList: [],
        loaded: false
    })