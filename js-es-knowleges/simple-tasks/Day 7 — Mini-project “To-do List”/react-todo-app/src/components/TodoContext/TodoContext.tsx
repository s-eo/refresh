import React, {createContext, useEffect, useReducer} from "react";

import {Todo} from '../../types/todo';
import {getNextId} from "./helper";
import {getTodos, storeTodos} from "../LocalStorage/LocalStorage-helpers";

export const TodoContext = createContext<Todo[]>([]);
export const TodoDispatchContext = createContext<Function | null>(null);


const initialTodoState = getTodos();

const todoReducer = (prevState: Todo[], action: any): Todo[] => {
    if (action?.type) {
        switch (action.type) {
            case 'deleted':
                return prevState.filter(todo => todo.id !== action.id)


            case 'toggled':
                return prevState.map(task => {
                    if (task.id === action?.id) {
                        return {
                            ...task,
                            completed: !task.completed,
                        }
                    }

                    return task;
                });

            case 'added':
                return [
                    ...prevState,
                    {
                        ...action.payload,
                        id: getNextId(prevState)
                    }
                ];

            case 'clearCompleted':
                return prevState.filter((todo) => !todo.completed);

            default:
                console.error('Unknown action in tasks reducer');
                return prevState;
        }
    }

    console.error('Action is not found in tasks reducer');
    return prevState;
}

interface Props {
    children: React.ReactNode;
}

export const TodoProvider = ({children}: Props) => {
    const [todos, dispatch] = useReducer(todoReducer, initialTodoState);

    // save all changes to Local Storage
    useEffect(() => {
        storeTodos(todos);
    }, [todos]);

    return (
        <TodoContext value={todos}>
            <TodoDispatchContext value={dispatch}>
                {children}
            </TodoDispatchContext>
        </TodoContext>
    );
}
