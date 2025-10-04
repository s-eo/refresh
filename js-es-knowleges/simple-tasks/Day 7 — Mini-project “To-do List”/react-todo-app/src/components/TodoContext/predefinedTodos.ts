import {ActionDispatch, useEffect} from "react";

import {getStoredTodos} from "../LocalStorage/LocalStorage";
import {setTodosManagerCreator} from "../FetchManager/FetchManager";


interface Props {
    dispatch: ActionDispatch<[action: any]>;
    dispatchFetchTodosState: ActionDispatch<[action: any]>;
}

// set initial todos from local storage <- web api || predefined static
export function usePredefinedTodos({ dispatch, dispatchFetchTodosState }: Props) {
    useEffect(() => {
        const setTodosManager = setTodosManagerCreator(dispatch, dispatchFetchTodosState);
        setTodosManager(getStoredTodos());
    }, [dispatch, dispatchFetchTodosState]);
}