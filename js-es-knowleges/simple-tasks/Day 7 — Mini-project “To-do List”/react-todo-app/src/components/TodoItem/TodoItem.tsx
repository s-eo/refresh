import React, {useMemo} from "react";
import clsx from "clsx";

import type {Todo} from "../../types/todo";

import deleteIcon from "../../assets/trash.svg";
import styles from "./TodoItem.module.css"
import Button from "../UI/Button/Button";

interface Props {
    todo: Todo;
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
}

export default function TodoItem({ todo, toggleTodo, deleteTodo }: Props) {
    const { id, completed, title, deadline: dLTimestamp } = todo;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => toggleTodo(id);
    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => deleteTodo(id);

    const deadline = useMemo(() => dLTimestamp ? new Date(+dLTimestamp).toDateString() : '', [dLTimestamp]);
    const isStale = useMemo(() => dLTimestamp ? +dLTimestamp < Date.now() : false, [dLTimestamp]);

    return (
        <li className={clsx(styles.container, completed && styles.completed)}>
            <input
                type="checkbox"
                checked={completed}
                onChange={handleChange}
                className={styles.checkbox}
            />
            <div className={styles.main}>
                <span className={styles.title}>
                  {title}
                </span>
                {deadline && (<div className={clsx(styles.deadline, isStale ? styles.overdue : styles.upcoming)}>
                    Due: {deadline}
                </div>)}
            </div>

            <Button
                variant='outline'
                onClick={handleDelete}
                className={styles.trash}
                aria-label="Delete task"
            >
                <img className={styles.img} src={deleteIcon} alt="x"/>
            </Button>
        </li>
    );
}
