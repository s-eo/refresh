import {Todo} from "../../types/todo";
import {promisifiedTimeout} from "../TodoContext/helper";

const TASKS_URL = 'https://jsonplaceholder.typicode.com/todos';
const LOADER_TIME = 2000; //ms
const time = Math.round(LOADER_TIME / 1000);
const DEFAULT_ERROR = 'Can`t fetch example tasks';
const ARTIFICIAL_ERROR = 'Error from notification bar. Next attempt should be successfull';

// TODO lazy loading
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
    const longFetchResult = await Promise.all([fetchTasks(), promisifiedTimeout(LOADER_TIME)]);

    if (needError) {
        return Promise.reject(DEFAULT_ERROR);
    }

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
}