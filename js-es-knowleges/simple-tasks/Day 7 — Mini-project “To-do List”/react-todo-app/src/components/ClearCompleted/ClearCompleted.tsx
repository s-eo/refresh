import React, {useContext} from "react";

import Button from "../UI/Button/Button";

import styles from "./ClearCompleted.module.css";
import {FetchTodoContext, useTodosDispatch} from "../TodoContext/TodoContext";

export default function ClearCompleted() {
    const dispatch = useTodosDispatch() as Function;
    const isShown = useContext(FetchTodoContext) !== 'pending';

    function handleClick() {
        dispatch({
            type: "clearCompleted"
        });
    }

    return isShown ? (
            <Button
                variant='secondary'
                onClick={handleClick}
                className={styles.clear}
            >Clear completed</Button>
    ) : null;
}