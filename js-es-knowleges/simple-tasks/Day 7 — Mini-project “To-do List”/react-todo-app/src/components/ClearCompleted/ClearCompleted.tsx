import React from "react";

import Button from "../UI/Button/Button";
import {Todo} from "../../types/todo";

import styles from "./ClearCompleted.module.css";
import clsx from "clsx";

interface Props {
    tasks: Array<Todo>;
    setTasks: (tasks: Array<Todo>) => void;
}

export default function ClearCompleted({ tasks, setTasks }: Props) {

    function handleClick() {
        setTasks(tasks.filter((task) => !task.completed));
    }

    return (
        <div className={styles.container}>
            <Button
                variant='normal'
                onClick={handleClick}
                className={styles.clear}
            >Clear completed</Button>
        </div>
    );
}