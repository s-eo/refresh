import React, {JSX, MouseEventHandler, ReactNode, useCallback, useContext, useMemo, useState} from 'react';

import {FetchTodoContext, FetchTodoDispatchContext, useTodosDispatch} from "../TodoContext/TodoContext";
import Loading from "../Loading/Loading";
import NotificationBox from "../Notification/NotificationBox";
import {Todo} from "../../types/todo";
import {promisifiedTimeout} from "../TodoContext/helper";
import Button from "../UI/Button/Button";

const TASKS_URL = 'https://jsonplaceholder.typicode.com/todos';
const LOADER_TIME = 1000; //ms
const time = Math.round(LOADER_TIME / 1000);
const DEFAULT_ERROR = 'Can`t fetch example tasks';

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
        reject();
    }
});
export const longFetch: (needError?: boolean) => Promise<Todo[]> = async (needError = false) => {
    if (needError) {
       return Promise.reject('Just want to let you see the error handling on page load and from notification bar');
   }

    const longFetchResult = await Promise.all([fetchTasks(), promisifiedTimeout(LOADER_TIME)]);
    return longFetchResult[0];
}

export function setTodosManagerCreator(dispatch: Function | null, dispatchFetchTodosState: Function | null, setErrorText?: Function):
    (initial?: Todo[] | null) => void {
    // first error in this manager: one should be in the todos list and one in the refetch handler
    let isFirstErrorSent = false;

    const onSuccess = (payload: Todo[]) => {
        dispatch && dispatch({
            type: 'set',
            payload,
        });
        dispatchFetchTodosState && dispatchFetchTodosState({ type: 'onSuccess' });

    }

    return async function (initial?: Todo[] | null) {
        if (Array.isArray(initial)) {
            onSuccess(initial);
        } else {
            dispatchFetchTodosState && dispatchFetchTodosState({ type: 'onLoad' });

            const isErrorNeeded = !isFirstErrorSent;
            isFirstErrorSent = true;

            longFetch(isErrorNeeded)
                .then(payload => {
                    onSuccess(payload);
                })
                .catch((error) => {
                    console.error(error);
                    dispatchFetchTodosState && dispatchFetchTodosState({ type: 'onError' });
                    setErrorText && setErrorText(error.message);
                });
        }
    }
}

interface Props {
    children: ReactNode;
}

export default function FetchManager({children}: Props):JSX.Element {
    const fetchState = useContext(FetchTodoContext);
    const fetchStateDispatch = useContext(FetchTodoDispatchContext);
    const dispatch = useTodosDispatch();


    const [toShowError, setToShowError] = React.useState(true);
    const [errorText, setErrorText] = useState(DEFAULT_ERROR);
    const hideError = useCallback(() => {
        setToShowError(false);
        setErrorText(DEFAULT_ERROR);
    }, [setToShowError, setErrorText]);

    const setRefetchError = (message: string) =>
        setErrorText('Error from notification bar. Next attempt should be successfull');
    const refetchManager = useMemo(() => setTodosManagerCreator(dispatch, fetchStateDispatch, setRefetchError),
        [dispatch, fetchStateDispatch]);
    const handleRefetchClick: MouseEventHandler = useCallback(() => refetchManager(), [refetchManager]);

    switch(fetchState) {
        case 'pending':
            return <Loading>
                <p>Loading task examples.</p>
                <p>Please wait {time} seconds minimum and watch this loader.</p>
            </Loading>;

        case 'error':
            return (
                <>
                    {toShowError && <NotificationBox
                        type="error"
                        message={errorText}
                        onClose={hideError}
                    >
                        <Button
                            variant='notification'
                            onClick={handleRefetchClick}
                        >Try again &#x21BA;</Button>
                    </NotificationBox>}
                    {children}
                </>
            );

        case 'initial':
        case 'completed':
        default:
            return <>{children}</>;
    }
}