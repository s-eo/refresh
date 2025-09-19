import React from "react";

import type {Todo} from "../../types/todo";

import TodoItem from "../TodoItem/TodoItem";

import styles from './TodoList.module.css';

interface Props {
    tasks: Todo[];
    visibleTasks: Todo[];
    setTasks: (tasks: Todo[]) => void;
}

export default function TodoList({ visibleTasks, tasks, setTasks }: Props) {
    const toggleTodo = (id: number) => {
        const nextTodos = tasks.map(task => {
            if (task.id === id) {
                return {
                    ...task,
                    completed: !task.completed,
                }
            }

            return task;
        })

        setTasks(nextTodos);
    }

    const deleteTodo = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    return (
        <ul className={styles.list}>
            {visibleTasks.length ? visibleTasks.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                />
            )) : <span>No more tasks there</span>}
        </ul>
    );
}
