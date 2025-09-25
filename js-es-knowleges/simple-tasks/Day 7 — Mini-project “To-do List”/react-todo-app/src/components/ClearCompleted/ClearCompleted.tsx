import React, {useContext} from "react";

import Button from "../UI/Button/Button";

import styles from "./ClearCompleted.module.css";
import {TodoDispatchContext} from "../TodoContext/TodoContext";

export default function ClearCompleted() {
    const dispatch = useContext(TodoDispatchContext) as Function;

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