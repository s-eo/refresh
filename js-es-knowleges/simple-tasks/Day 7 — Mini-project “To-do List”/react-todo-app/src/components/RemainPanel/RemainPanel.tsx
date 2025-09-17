import React, {useMemo} from "react";

import {Todo} from "../../types/todo";

import styles from './RemainPanel.module.css';

interface RemainPanelProps {
    tasks: Todo[];

}

const REMAIN_PHRASE = "unsolved tasks remain";
const NO_REMAIN_PHRASE = "No unsolved tasks remain";

export default function RemainPanel({ tasks }: RemainPanelProps) {
    const count = useMemo(() => tasks
        .filter(task => !task.completed).length, [tasks]);

    return (
        <div className={styles.panel}>{count || ''} {count ? REMAIN_PHRASE : NO_REMAIN_PHRASE}</div>
    );
}