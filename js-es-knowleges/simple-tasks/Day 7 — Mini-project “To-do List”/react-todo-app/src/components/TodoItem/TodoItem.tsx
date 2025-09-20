import React, {useMemo} from "react";

import type {Todo} from "../../types/todo";

import deleteIcon from "../../assets/trash.svg";
import styles from "./TodoItem.module.css"
import Button from "../UI/Button/Button";
import clsx from "clsx";

interface Props {
    todo: Todo;
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
}

export default function TodoItem({ todo, toggleTodo, deleteTodo }: Props) {
    const { id, completed, title, deadline } = todo;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => toggleTodo(id);
    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => deleteTodo(id);

    const date = useMemo(() => deadline ? new Date(+deadline).toDateString() : '', [deadline]);
    const isStale = useMemo(() => deadline ? +deadline < Date.now() : false, [deadline]);

    return (
        <li className={styles.container}>
            <span className={styles.main}>
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={handleChange}
                />
                <span className={styles.title} style={{textDecoration: completed ? "line-through" : "none"}}>
                  {title}
                </span>
            </span>

            <Button
                variant="danger"
                onClick={handleDelete}
                className={styles.trash}
            >
                <img className={styles.img} src={deleteIcon} alt="x"/>
            </Button>
            {deadline && (<div className={clsx(styles.line, styles.deadline, isStale && styles.stale)}>
                <span>Until {date}</span>
            </div>)}
        </li>
    );
}
