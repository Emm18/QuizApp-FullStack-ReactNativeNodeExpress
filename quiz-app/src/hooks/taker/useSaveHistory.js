import { useContext } from 'react';
import { Context as TakerHistoryContext } from '../../context/taker/HistoryContext'

export default () => {
    const { saveHistory } = useContext(TakerHistoryContext);

    const save = async (data, cb, nav) => {
        saveHistory(data);

        if (cb) {
            cb();
        }

        if (nav) {
            nav();
        }
    }

    return [save];
}