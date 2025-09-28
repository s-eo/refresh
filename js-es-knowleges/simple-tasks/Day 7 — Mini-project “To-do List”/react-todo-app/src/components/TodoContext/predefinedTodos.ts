import {ActionDispatch, useEffect} from "react";

import {Todo} from "../../types/todo";
import {getStoredTodos} from "../LocalStorage/LocalStorage";

const TASKS_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTasks = async (): Promise<Todo[]> => new Promise(async resolve => {
    try {
        const response = await fetch(TASKS_URL);
        const data = await response.json();

        if (Array.isArray(data)) {
            resolve(data);
        } else {
            throw Error('Inappropriate response');
        }
    } catch (e) {
        console.error('Can`t fetch initial tasks', e);
        resolve([]);
    }
});

interface Props {
    dispatch: ActionDispatch<[action: any]>;
}

// set initial todos from local storage <- web api || predefined static
export function usePredefinedTodos({ dispatch }: Props) {
    useEffect(() => {
        const storedTodos = getStoredTodos();

        // if no data was saved in the local storage then fetch from 3rd party API
        const promisifiedTodos: Promise<Todo[]> = storedTodos ? Promise.resolve(storedTodos) : fetchTasks();

        promisifiedTodos.then(payload => dispatch(
                {
                    type: 'set',
                    payload
                }))
    }, [dispatch]);
}