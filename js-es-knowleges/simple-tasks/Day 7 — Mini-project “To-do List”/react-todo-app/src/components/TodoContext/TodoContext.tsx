import React, {createContext, useContext, useEffect, useReducer} from "react";

import {Todo} from '../../types/todo';
import {storeTodos} from "../LocalStorage/LocalStorage";
import {usePredefinedTodos} from "./predefinedTodos";
import {todoReducer} from "./todoReducer";

export const TodoContext = createContext<Todo[] | undefined>(undefined);
export const TodoDispatchContext = createContext<Function | null>(null);

export const IsReadyTodoContext = createContext<boolean>(false);
export const IsReadyTodoDispatchContext = createContext<Function | null>(null);

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
    const [todos, dispatch] = useReducer(todoReducer, undefined);
    const [isReadyTodos, dispatchIsReadyTodos] = useReducer(() => true, false);

    // set initial todos async
    usePredefinedTodos({dispatch, dispatchIsReadyTodos});

    // save all changes to Local Storage
    useEffect(() => {
        todos && storeTodos(todos);
    }, [todos]);

    return (
        <IsReadyTodoContext value={isReadyTodos}>
            <IsReadyTodoDispatchContext value={dispatchIsReadyTodos}>
                <TodoContext value={todos}>
                    <TodoDispatchContext value={dispatch}>
                        {children}
                    </TodoDispatchContext>
                </TodoContext>
            </IsReadyTodoDispatchContext>
        </IsReadyTodoContext>
    );
}
