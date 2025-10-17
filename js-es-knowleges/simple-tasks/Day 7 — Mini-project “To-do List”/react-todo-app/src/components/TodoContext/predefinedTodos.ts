import React, {ActionDispatch, useEffect} from "react";

import {getStoredTodos} from "../LocalStorage/LocalStorage";
import {Todo} from "../../types/todo";
import {promisifiedTimeout} from "./helper";

const TASKS_URL = 'https://jsonplaceholder.typicode.com/todos';
const LOADER_TIME = 2000; //ms
const time = Math.round(LOADER_TIME / 1000);
const DEFAULT_ERROR = 'Can`t fetch example tasks';
const ARTIFICIAL_ERROR = 'Error from notification bar. Next attempt should be successfull';

// TODO lazy loading
const fetchTasks = async (): Promise<Todo[]> => new Promise(async (resolve, reject) => {
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
const longFetch: (needError?: boolean) => Promise<Todo[]> = async (needError = false) => {
    const longFetchResult = await Promise.all([fetchTasks(), promisifiedTimeout(LOADER_TIME)]);

    if (needError) {
        return Promise.reject(DEFAULT_ERROR);
    }

    return longFetchResult[0];
}

interface Props {
    dispatch: ActionDispatch<[action: any]>;
    dispatchFetchTodosState: ActionDispatch<[action: any]>;
    dispatchNotification: ActionDispatch<[action: any]> | null;
}

// set initial todos from local storage <- web api || predefined static
export function usePredefinedTodos({ dispatch, dispatchFetchTodosState, dispatchNotification }: Props) {
    const isFirst = React.useRef(false);

    useEffect(() => {
        if (!isFirst.current) {
            let isFirstErrorSent = false;
            let isFirstTrayErrorSent = false;

            async function initializer (initial?: Todo[] | null) {
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
                    console.log(`Loading task examples. Please wait ${time} seconds minimum and watch this loader.`);
                    dispatchFetchTodosState && dispatchFetchTodosState({ type: 'onLoad' });

                    const isErrorNeeded = !isFirstErrorSent || !isFirstTrayErrorSent;
                    let message = isFirstErrorSent && !isFirstTrayErrorSent ? ARTIFICIAL_ERROR : null;

                    if (isFirstErrorSent) {
                        isFirstTrayErrorSent = true;
                    }
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
                        });
                }
            }

            initializer(getStoredTodos());
        }



        isFirst.current = true;
    }, [dispatch, dispatchFetchTodosState, dispatchNotification, isFirst]);
}