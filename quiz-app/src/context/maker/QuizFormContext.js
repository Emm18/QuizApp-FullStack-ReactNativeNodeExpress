import createDataContext from '../createDataContext';

const quizFormReducer = (state, action) => {

    if (action.type == 'change_quiz_type') {
        return { ...state, quizType: action.payload }
    }

    if (action.type == 'change_quiz_title') {
        return { ...state, quizTitle: action.payload }
    }

    if (action.type == 'change_passing_score') {
        return { ...state, passingScore: action.payload }
    }

    if (action.type == 'toggle_multiple_choice_overlay') {
        return { ...state, showMultipleChoiceQuestion: action.payload }
    }

    if (action.type == 'toggle_select_all_that_apply_overlay') {
        return { ...state, showSelectAllThatApplyQuestion: action.payload }
    }

    if (action.type == 'toggle_true_or_false_overlay') {
        return { ...state, showTrueOrFalseQuestion: action.payload }
    }

    if (action.type == 'toggle_quiz_title_error') {
        return { ...state, quizError: action.payload }
    }

    if (action.type == 'toggle_passing_score_error') {
        return { ...state, passingScoreError: action.payload }
    }

    if (action.type == 'toggle_questions_error') {
        return { ...state, questionsError: action.payload }
    }

    if (action.type == 'add_question') {
        return { ...state, questions: [...state.questions, action.payload] }
    }

    if (action.type == 'remove_question') {
        const newQuestions = state.questions.filter((q, index) => index != action.payload);
        return { ...state, questions: newQuestions };
    }

    if (action.type == 'remove_all_question') {
        return { ...state, questions: [] };
    }

    if (action.type == 'set_form') {
        const { quizType,
            quizTitle,
            passingScore,
            questions } = action.payload;

        return {
            ...state,
            quizType,
            quizTitle,
            passingScore: passingScore.toString(),
            questions
        };
    };

    if (action.type == 'reset_form') {
        return {
            quizType: 0,
            quizTitle: '',
            quizError: false,
            passingScore: '',
            passingScoreError: false,
            questionsError: false,
            showMultipleChoiceQuestion: false,
            showSelectAllThatApplyQuestion: false,
            showTrueOrFalseQuestion: false,
            questions: []
        }
    }

    return state
};

//DISPATCH FUNCTIONS
const changeQuizType = dispatch => (val) => {
    dispatch({ type: 'change_quiz_type', payload: val });
};

const changeQuizTitle = dispatch => (val) => {
    dispatch({ type: 'change_quiz_title', payload: val });
};

const toggleQuizTitleError = dispatch => (val) => {
    dispatch({ type: 'toggle_quiz_title_error', payload: val });
};

const changePassingScore = dispatch => (val) => {
    dispatch({ type: 'change_passing_score', payload: val });
};

const togglePassingScoreError = dispatch => (val) => {
    dispatch({ type: 'toggle_passing_score_error', payload: val });
};

const toggleQuestionsError = dispatch => (val) => {
    dispatch({ type: 'toggle_questions_error', payload: val });
};

const toggleMultipleChoiceQuestion = dispatch => (val) => {
    dispatch({ type: "toggle_multiple_choice_overlay", payload: val })
};

const toggleSelectAllThatApplyQuestion = dispatch => (val) => {
    dispatch({ type: "toggle_select_all_that_apply_overlay", payload: val })
};

const toggleTrueOrFalseQuestion = dispatch => (val) => {
    dispatch({ type: "toggle_true_or_false_overlay", payload: val })
};

const resetForm = dispatch => () => {
    dispatch({ type: "reset_form" })
};

const addQuestion = dispatch => (question, answers) => {
    dispatch({ type: 'add_question', payload: { question, answers } })
};

const removeQuestion = dispatch => (index) => {
    dispatch({ type: 'remove_question', payload: index })
}

const removeAllQuestion = dispatch => () => {
    dispatch({ type: 'remove_all_question' });
}

const setForm = dispatch => (quiz) => {
    dispatch({ type: 'set_form', payload: quiz });
}

export const { Context, Provider } = createDataContext(
    quizFormReducer,
    {
        changeQuizType,
        changeQuizTitle,
        toggleQuizTitleError,
        changePassingScore,
        togglePassingScoreError,
        toggleQuestionsError,
        toggleMultipleChoiceQuestion,
        toggleSelectAllThatApplyQuestion,
        toggleTrueOrFalseQuestion,
        resetForm,
        addQuestion,
        removeQuestion,
        removeAllQuestion,
        setForm
    },
    {
        quizType: 0,
        quizTitle: '',
        quizError: false,
        passingScore: '',
        passingScoreError: false,
        questionsError: false,
        showMultipleChoiceQuestion: false,
        showSelectAllThatApplyQuestion: false,
        showTrueOrFalseQuestion: false,
        questions: []
    })