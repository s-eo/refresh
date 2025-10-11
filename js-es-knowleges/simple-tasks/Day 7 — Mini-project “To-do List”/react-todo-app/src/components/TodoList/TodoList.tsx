import React, {useMemo} from "react";

import TodoItem from "../TodoItem/TodoItem";
import {useTodos, useTodosDispatch} from '../TodoContext/TodoContext';

import styles from './TodoList.module.css';
import {filterFunction} from "../TodoFilter/TodoFilter";
import {Filter} from "../../types/filter";

interface Props {
    filter: Filter;
}

export default function TodoList({ filter }: Props) {
    const dispatch = useTodosDispatch() as Function;
    const todos = useTodos();
// TODO lazy loading
    const visibleTasks = useMemo(() => filterFunction(todos, filter), [todos, filter]);

    const handleToggleTodo = (id: number) => {
        dispatch({
            type: "toggled",
            id
        });
    }

    function handleDeleteTodo(id: number) {
        dispatch({
            type: 'deleted',
            id
        });
    }

    return visibleTasks.length ?
        <ul className={styles.list}>
            {visibleTasks.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleTodo={handleToggleTodo}
                    deleteTodo={handleDeleteTodo}
                />
            ))}
        </ul> : <div className={styles.empty}>No more tasks there</div>;
}
