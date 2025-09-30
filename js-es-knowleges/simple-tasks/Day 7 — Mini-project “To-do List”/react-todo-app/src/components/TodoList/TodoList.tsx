import React, {useContext, useMemo} from "react";


import TodoItem from "../TodoItem/TodoItem";
import {IsReadyTodoContext, useTodos, useTodosDispatch} from '../TodoContext/TodoContext';

import styles from './TodoList.module.css';
import {filterFunction} from "../TodoFilter/TodoFilter";
import {Filter} from "../../types/filter";
import Loading from "../Loading/Loading";

interface Props {
    filter: Filter;
}

export default function TodoList({ filter }: Props) {
    const dispatch = useTodosDispatch() as Function;
    const todos = useTodos();
    const isReadyTodos = useContext(IsReadyTodoContext);

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

    return (
        isReadyTodos ? (<ul className={styles.list}>
            {visibleTasks.length ? visibleTasks.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleTodo={handleToggleTodo}
                    deleteTodo={handleDeleteTodo}
                />
            )) : <span>No more tasks there</span>}
        </ul>) : <Loading />
    );
}
