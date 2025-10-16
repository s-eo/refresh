import React, {ActionDispatch, useEffect} from "react";

import {getStoredTodos} from "../LocalStorage/LocalStorage";
import {initialFetchManager} from "../FetchManager/FetchManager";


interface Props {
    dispatch: ActionDispatch<[action: any]>;
    dispatchFetchTodosState: ActionDispatch<[action: any]>;
    dispatchNotifications: ActionDispatch<[action: any]> | null;
}

// set initial todos from local storage <- web api || predefined static
export function usePredefinedTodos({ dispatch, dispatchFetchTodosState, dispatchNotifications }: Props) {
    const isFirst = React.useRef(false);

    useEffect(() => {
        if (!isFirst.current) {
            const setTodosManager = initialFetchManager(dispatch, dispatchFetchTodosState, dispatchNotifications);
            setTodosManager(getStoredTodos());
        }

        isFirst.current = true;
    }, [dispatch, dispatchFetchTodosState, dispatchNotifications, isFirst]);
}