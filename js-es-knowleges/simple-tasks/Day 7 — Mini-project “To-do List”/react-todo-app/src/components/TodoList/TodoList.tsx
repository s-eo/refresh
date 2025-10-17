import React, {useCallback, useContext, useMemo} from "react";

import Loading from "../Loading/Loading";
import TodoItem from "../TodoItem/TodoItem";
import {FetchTodoContext, useTodos, useTodosDispatch} from '../TodoContext/TodoContext';

import styles from './TodoList.module.css';
import {filterFunction} from "../TodoFilter/TodoFilter";
import {Filter} from "../../types/filter";

interface Props {
    filter: Filter;
}

export default function TodoList({ filter }: Props) {
    const dispatch = useTodosDispatch() as Function;
    const todos = useTodos();
    const fetchState = useContext(FetchTodoContext);

    const visibleTasks = useMemo(() => filterFunction(todos, filter), [todos, filter]);

    const handleToggleTodo = useCallback((id: number) => {
        dispatch({
            type: "toggled",
            id
        });
    }, [dispatch]);

    const handleDeleteTodo = useCallback((id: number) => {
        dispatch({
            type: 'deleted',
            id
        });
    }, [dispatch]);

    if (fetchState === 'pending') {
        return <Loading/>;
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
