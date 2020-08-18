import createDataContext from '../createDataContext'
import quizApi from '../../api/quiz';

const quizReducer = (state, action) => {

    return state
};

//DISPATCH FUNCTIONS
const createQuiz = dispatch => async (data) => {
    try {
        const { quizTitle, quizType, passingScore, questions } = data;
        await quizApi.post('/saveQuiz', { quizTitle, quizType, passingScore, questions });
    } catch (err) {
        console.log(err)
    }
}

const deleteQuiz = dispatch => async (id) => {
    try {
        await quizApi.post('/deleteQuiz', { id });
    } catch (err) {
        console.log(err)
    }
}

const updateQuiz = dispatch => async (id, data) => {
    try {
        const { quizTitle, quizType, passingScore, questions } = data;
        await quizApi.post('/updateQuiz', { _id: id, quizTitle, quizType, passingScore, questions });
    } catch (err) {
        console.log(err)
    }
}

export const { Context, Provider } = createDataContext(
    quizReducer,
    {
        createQuiz,
        deleteQuiz,
        updateQuiz
    },
    [])