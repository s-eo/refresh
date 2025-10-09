import React, {useContext} from "react";

import Button from "../UI/Button/Button";

import styles from "./ClearCompleted.module.css";
import {FetchTodoContext, useTodosDispatch} from "../TodoContext/TodoContext";

export default function ClearCompleted() {
    const dispatch = useTodosDispatch() as Function;
    const isDisabled = useContext(FetchTodoContext) === 'pending';

    function handleClick() {
        dispatch({
            type: "clearCompleted"
        });
    }

    return (
            <Button
                variant='secondary'
                onClick={handleClick}
                className={styles.clear}
                disabled={isDisabled}
            >Clear completed</Button>
    );
}