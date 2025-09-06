import React from "react";

import type {Todo} from "../types/todo";
import TodoItem from "./TodoItem";

interface Props {
    todos: Todo[];
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
}

export default function TodoList({ todos, toggleTodo, deleteTodo }: Props) {
    return (
        <ul>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                />
            ))}
        </ul>
    );
}
