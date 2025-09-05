import React from "react";

import type {Todo} from "../types/todo";

import deleteIcon from "../assets/close.png";
import "./TodoItem.css"

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
            <span style={{ textDecoration: completed ? "line-through" : "none" }}>
              {title}
            </span>
            <button className="remove-button" onClick={handleDelete}>
                <img src={deleteIcon} alt="x" />
            </button>
        </li>
    );
}
