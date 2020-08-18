import createDataContext from '../createDataContext';
import quizApi from '../../api/quiz';

const listOfQuizReducer = (state, action) => {

    if (action.type == 'change_search') {
        return { ...state, search: action.payload };
    }

    if (action.type == 'set_quiz_list') {
        return { ...state, quizList: action.payload };
    }

    if (action.type == 'get_quiz') {
        return { ...state, quiz: action.payload };
    }

    return state
};

//DISPATCH FUNCTIONS
const changeSearch = dispatch => (val) => {
    dispatch({ type: 'change_search', payload: val });
};

const getQuizByType = dispatch => async (quizType) => {
    try {
        const response = await quizApi.get('/quizByType', { params: { quizType } });
        dispatch({ type: 'set_quiz_list', payload: response.data })
    } catch (err) {
        console.log(err);
    }
};

const searchQuiz = dispatch => async (keyword, quizType) => {
    try {
        const response = await quizApi.get('/quizByType', { params: { quizType } });
        let quizList = response.data;
        let newQuizList = quizList.filter(q => q.quizTitle.includes(keyword.toLowerCase()) || q.quizTitle.includes(keyword.toUpperCase()));

        dispatch({ type: 'set_quiz_list', payload: newQuizList })
    } catch (err) {
        console.log(err);
    }
}

const getQuiz = dispatch => async (id) => {
    try {
        const response = await quizApi.get('/quiz', { params: { id } });
        dispatch({ type: 'get_quiz', payload: response.data })
    } catch (err) {
        console.log(err);
    }
};

export const { Context, Provider } = createDataContext(
    listOfQuizReducer,
    {
        changeSearch,
        getQuizByType,
        getQuiz,
        searchQuiz
    },
    {
        search: '',
        quizList: [],
        quiz: {}
    })