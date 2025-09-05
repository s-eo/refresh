import React from "react";

import type {Todo} from "../types/todo";

import deleteIcon from "../assets/close.png";
import styles from  "./TodoItem.module.css"

interface Props {
    todo: Todo;
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
}

export default function TodoItem({ todo, toggleTodo, deleteTodo }: Props) {
    const { id, completed, title } = todo;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => toggleTodo(id);
    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => deleteTodo(id);

    return (
        <li>
            <input
                type="checkbox"
                checked={completed}
                onChange={handleChange}
            />
            <span className={styles.title} style={{ textDecoration: completed ? "line-through" : "none" }}>
              {title}
            </span>
            <button className={styles.delete} onClick={handleDelete}>
                <img className={styles.img} src={deleteIcon} alt="x" />
            </button>
        </li>
    );
}
