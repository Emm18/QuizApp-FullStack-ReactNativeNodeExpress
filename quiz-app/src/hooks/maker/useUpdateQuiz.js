import { useContext } from 'react';
import { Context as MakerQuizContext } from '../../context/maker/QuizContext'

export default () => {
    const { updateQuiz } = useContext(MakerQuizContext);

    const update = async (id, data, cb, nav) => {
        updateQuiz(id, data);

        if (cb) {
            cb();
        }

        if (nav) {
            nav();
        }
    }

    return [update];
}