import { useContext } from 'react';
import { Context as MakerQuizContext } from '../../context/maker/QuizContext'

export default () => {
    const { createQuiz } = useContext(MakerQuizContext);

    const create = async (data, cb, nav) => {
        createQuiz(data);

        if (cb) {
            cb();
        }

        if (nav) {
            nav();
        }
    }

    return [create];
}