import React, {useContext} from "react";

import Button from "../UI/Button/Button";

import styles from "./ClearCompleted.module.css";
import {IsReadyTodoContext, useTodosDispatch} from "../TodoContext/TodoContext";

export default function ClearCompleted() {
    const dispatch = useTodosDispatch() as Function;
    const isDisabled = !useContext(IsReadyTodoContext);

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
                disabled={isDisabled}
            >Clear completed</Button>
        </div>
    );
}