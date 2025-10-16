import React, {createContext, useContext, useEffect, useReducer} from "react";

import {Todo} from '../../types/todo';
import {storeTodos} from "../LocalStorage/LocalStorage";
import {usePredefinedTodos} from "./predefinedTodos";
import {fetchTodoReducer, todoReducers} from "./todoReducers";
import {FetchState} from "../../types/fetch";
import {NotificationDispatchContext} from "../Notification/NotificationManager";

export const TodoContext = createContext<Todo[] | undefined>(undefined);
export const TodoDispatchContext = createContext<Function | null>(null);

export const FetchTodoContext = createContext<FetchState>('pending');
export const FetchTodoDispatchContext = createContext<Function | null>(null);

export function useTodos() {
    return useContext(TodoContext);
}

export function useTodosDispatch() {
    return useContext(TodoDispatchContext);
}

interface Props {
    children: React.ReactNode;
}

export const TodoProvider = ({children}: Props) => {
    const [todos, dispatch] = useReducer(todoReducers, undefined);
    const [fetchTodosState, dispatchFetchTodosState] = useReducer(fetchTodoReducer, 'initial');
    const dispatchNotifications = useContext(NotificationDispatchContext);

    // set initial todos async
    usePredefinedTodos({dispatch, dispatchFetchTodosState, dispatchNotifications});

    // save all changes to Local Storage
    useEffect(() => {
        todos && storeTodos(todos);
    }, [todos]);

    return (
        <FetchTodoContext value={fetchTodosState}>
            <FetchTodoDispatchContext value={dispatchFetchTodosState}>
                <TodoContext value={todos}>
                    <TodoDispatchContext value={dispatch}>
                        {children}
                    </TodoDispatchContext>
                </TodoContext>
            </FetchTodoDispatchContext>
        </FetchTodoContext>
    );
}
