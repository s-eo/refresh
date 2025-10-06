import React, {useMemo} from "react";

import styles from './RemainPanel.module.css';
import {useTodos} from "../TodoContext/TodoContext";

const REMAIN_PHRASES = ["unsolved task", "remain"];
const NO_REMAIN_PHRASE = ""; // "No unsolved tasks remain";

const getRemainPhrase = (count: number) => {
    switch (count) {
        case 0:
            return NO_REMAIN_PHRASE;
        case 1:
            return '1 ' + REMAIN_PHRASES.join(' ');
        default:
            return count + ' ' + REMAIN_PHRASES.join('s ');
    }
}

export default function RemainPanel() {
    const tasks = useTodos();
    const count = useMemo(() => tasks ? tasks
        .filter(task => !task.completed).length : 0, [tasks]);

    return (
        <div className={styles.panel}>{getRemainPhrase(count)}</div>
    );
}