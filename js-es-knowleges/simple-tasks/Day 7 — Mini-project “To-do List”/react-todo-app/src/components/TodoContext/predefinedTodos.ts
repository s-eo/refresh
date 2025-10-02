import {ActionDispatch, useEffect} from "react";

import {Todo} from "../../types/todo";
import {getStoredTodos} from "../LocalStorage/LocalStorage";
import {promisifiedTimeout} from "./helper";

const TASKS_URL = 'https://jsonplaceholder.typicode.com/todos';
export const LOADER_TIME = 4000; //ms

export const fetchTasks = async (): Promise<Todo[]> => new Promise(async (resolve, reject) => {
    try {
        const responses = await Promise.all([fetch(TASKS_URL), promisifiedTimeout(LOADER_TIME),
        Promise.reject()]);
        const data = await responses[0].json();

        if (Array.isArray(data)) {
            resolve(data);
        } else {
            throw Error('Inappropriate response');
        }

    } catch (e) {
        console.error('Can`t fetch initial tasks', e);
        reject();
    }
});

interface Props {
    dispatch: ActionDispatch<[action: any]>;
    dispatchFetchTodosState: ActionDispatch<[action: any]>;
}

// set initial todos from local storage <- web api || predefined static
export function usePredefinedTodos({ dispatch, dispatchFetchTodosState }: Props) {
    useEffect(() => {
        const storedTodos = getStoredTodos();

        // if no data was saved in the local storage then fetch from 3rd party API
        const promisifiedTodos: Promise<Todo[]> = storedTodos ? Promise.resolve(storedTodos) : fetchTasks();

        promisifiedTodos
            .then(payload => {
                dispatch({
                    type: 'set',
                    payload,
                });
                dispatchFetchTodosState({ type: 'onSuccess' });
            })
            .catch(() => {
                dispatchFetchTodosState({ type: 'onError' });
            });
    }, [dispatch, dispatchFetchTodosState]);
}