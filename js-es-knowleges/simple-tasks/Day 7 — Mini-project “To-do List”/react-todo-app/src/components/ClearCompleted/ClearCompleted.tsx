import React from "react";

import Button from "../UI/Button/Button";

import styles from "./ClearCompleted.module.css";
import {useTodosDispatch} from "../TodoContext/TodoContext";

export default function ClearCompleted() {
    const dispatch = useTodosDispatch() as Function;

    function handleClick() {
        dispatch({
            type: "clearCompleted"
        });
    }

    return (
        <div className={styles.container}>
            <Button
                variant='danger'
                onClick={handleClick}
                className={styles.clear}
            >Clear completed</Button>
        </div>
    );
}