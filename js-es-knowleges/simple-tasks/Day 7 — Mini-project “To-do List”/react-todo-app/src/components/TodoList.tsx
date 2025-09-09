import React from "react";

import type {Todo} from "../types/todo";

import TodoItem from "./TodoItem/TodoItem";

interface Props {
    tasks: Todo[];
    setTasks: (tasks: Todo[]) => void;
}

export default function TodoList({ tasks, setTasks }: Props) {
    const toggleTodo = (id: number) => {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                task.completed = !task.completed;
            }

            return task;
        }))
    }

    const deleteTodo = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    return (
        <ul>
            {tasks.map(todo => (
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
