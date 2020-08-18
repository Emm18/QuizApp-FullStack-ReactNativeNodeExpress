import createDataContext from '../createDataContext';
const quizReducer = (state, action) => {

    if (action.type == 'toggle_start') {
        return { ...state, startQuiz: action.payload }
    }

    if (action.type == 'set_question_and_answers') {
        return {
            ...state,
            questionsList: action.payload.questionsList,
            correctAnswersList: action.payload.correctAnswersList,
            takerAnswersList: action.payload.takerAnswersList
        }
    }

    if (action.type == 'change_answer') {
        const { questionNumber, answerNumber, answer, value, } = action.payload.answers;
        const quizType = action.payload.quizType;
        let updatedTakerAnswersList = [];

        state.takerAnswersList.map(qn => {

            if (qn.questionNumber != questionNumber) {
                updatedTakerAnswersList.push(qn);
            } else {
                if (quizType == 0 || quizType == 2) {
                    //all answers in multiple choice and true or false needs to be updated
                    //change all answer with the same question number
                    //make other answer 0 and 1 for the selected answerNumber
                    if (qn.answerNumber != answerNumber) {
                        let updatedAnswer = {
                            questionNumber: qn.questionNumber,
                            answerNumber: qn.answerNumber,
                            answer: qn.answer,
                            value: 0
                        }
                        updatedTakerAnswersList.push(updatedAnswer);
                    } else {
                        let updatedAnswer = {
                            questionNumber,
                            answerNumber,
                            answer,
                            value: qn.value == 0 ? 1 : 0
                        }
                        updatedTakerAnswersList.push(updatedAnswer);
                    }
                } else {
                    //for select all that apply update the only answer who have the same
                    //selected answer number
                    if (qn.answerNumber != answerNumber) {
                        updatedTakerAnswersList.push(qn);
                    } else {
                        let updatedAnswer = {
                            questionNumber,
                            answerNumber,
                            answer,
                            value: value == 0 ? 1 : 0
                        }
                        updatedTakerAnswersList.push(updatedAnswer);
                    }
                }
            }
        });

        return {
            ...state,
            takerAnswersList: updatedTakerAnswersList
        }
    }

    if (action.type == 'reset') {
        return {
            startQuiz: false,
            questionsList: [],
            correctAnswersList: [],
            takerAnswersList: [],
            totalScore: 0,
            remarks: '',
            questionToDisplay: 0
        }
    }

    if (action.type == 'change_question_to_display') {
        return {
            ...state,
            questionToDisplay: state.questionToDisplay + action.payload
        }
    }

    return state
};

//DISPATCH FUNCTIONS
const toggleStartQuiz = dispatch => (val) => {
    dispatch({ type: 'toggle_start', payload: val })
}

const setQuestionsAndAnswersList = dispatch => async (questions) => {
    let questionsList = [];
    let correctAnswersList = [];
    let takerAnswersList = [];

    await questions.map((q, index) => {
        let questionNumber = index;

        let question = {
            questionNumber,
            question: q.question
        }

        questionsList.push(question);

        q.answers.map((ans, index) => {
            let correctAnswer = {
                questionNumber,
                answerNumber: index,
                answer: ans.answer,
                value: ans.value
            }
            let takerAnswer = {
                questionNumber,
                answerNumber: index,
                answer: ans.answer,
                value: 0
            }

            correctAnswersList.push(correctAnswer);
            takerAnswersList.push(takerAnswer);
        })
    })

    dispatch({ type: "set_question_and_answers", payload: { questionsList, correctAnswersList, takerAnswersList } });
}

const changeAnswer = dispatch => (quizType, answers) => {
    dispatch({ type: 'change_answer', payload: { answers, quizType } })
}

const changeQuestionToDisplay = dispatch => (val) => {
    dispatch({ type: 'change_question_to_display', payload: val })
}

const reset = dispatch => () => {
    dispatch({ type: 'reset' })
}
export const { Context, Provider } = createDataContext(
    quizReducer,
    {
        toggleStartQuiz,
        setQuestionsAndAnswersList,
        changeAnswer,
        changeQuestionToDisplay,
        reset
    },
    {
        startQuiz: false,
        questionsList: [],
        correctAnswersList: [],
        takerAnswersList: [],
        totalScore: 0,
        remarks: '',
        questionToDisplay: 0
    })