import { useContext } from 'react';
import { Context as MakerQuizContext } from '../../context/maker/QuizContext'

export default () => {
    const { deleteQuiz } = useContext(MakerQuizContext);

    const del = async (id, nav) => {
        deleteQuiz(id);

        if (nav) {
            nav();
        }
    }

    return [del];
}