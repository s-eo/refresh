import React, {JSX, ReactNode, useContext} from 'react';

import {FetchTodoContext} from "../TodoContext/TodoContext";
import Loading from "../Loading/Loading";
import {Todo} from "../../types/todo";
import {promisifiedTimeout} from "../TodoContext/helper";

const TASKS_URL = 'https://jsonplaceholder.typicode.com/todos';
const LOADER_TIME = 1000; //ms
const time = Math.round(LOADER_TIME / 1000);
const DEFAULT_ERROR = 'Can`t fetch example tasks';
const ARTIFICIAL_ERROR = 'Error from notification bar. Next attempt should be successfull';

export const fetchTasks = async (): Promise<Todo[]> => new Promise(async (resolve, reject) => {
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
        reject(e);
    }
});
export const longFetch: (needError?: boolean) => Promise<Todo[]> = async (needError = false) => {
    if (needError) {
       return Promise.reject(DEFAULT_ERROR);
   }

    const longFetchResult = await Promise.all([fetchTasks(), promisifiedTimeout(LOADER_TIME)]);
    return longFetchResult[0];
}

export function initialFetchManager(dispatch: Function | null, dispatchFetchTodosState: Function | null, dispatchNotification: Function | null):
    (initial?: Todo[] | null) => void {
    // there should be two errors. one in initial render and one from retry button
    let isFirstErrorSent = false;
    let isFirstTrayErrorSent = false;

    return async function initializer (initial?: Todo[] | null) {
        const onNewTodos = (payload: Todo[]) => {
            dispatch && dispatch({
                type: 'set',
                payload,
            });
            dispatchFetchTodosState && dispatchFetchTodosState({ type: 'onSuccess' });

        }
        if (Array.isArray(initial)) {
            onNewTodos(initial);
        } else {
            dispatchFetchTodosState && dispatchFetchTodosState({ type: 'onLoad' });

            const isErrorNeeded = !isFirstErrorSent || !isFirstTrayErrorSent;
            let message = isFirstErrorSent && !isFirstTrayErrorSent ? ARTIFICIAL_ERROR : null;
            isFirstErrorSent = true;

            longFetch(isErrorNeeded)
                .then(payload => {
                    onNewTodos(payload);
                })
                .catch((error) => {
                    console.error(error);
                    dispatchFetchTodosState && dispatchFetchTodosState({ type: 'onError' });

                    message = message || error?.message || DEFAULT_ERROR;
                    dispatchNotification && dispatchNotification({
                        type: 'add',
                        payload: {
                            type: 'error',
                            message,
                            retryAction: initializer,
                        }
                    });
                    isFirstTrayErrorSent = true;
                });
        }
    }
}

interface Props {
    children: ReactNode;
}

export default function FetchManager({children}: Props):JSX.Element {
    const fetchState = useContext(FetchTodoContext);
    
    if (fetchState === 'pending')
            return <Loading>
                <p>Loading task examples.</p>
                <p>Please wait {time} seconds minimum and watch this loader.</p>
            </Loading>;
    
    return <>{children}</>;
}