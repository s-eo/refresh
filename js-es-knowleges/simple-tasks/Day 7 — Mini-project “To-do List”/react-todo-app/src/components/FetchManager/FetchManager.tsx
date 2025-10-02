import React, {JSX, ReactNode, useCallback, useContext} from 'react';

import {LOADER_TIME} from "../TodoContext/predefinedTodos";
import {FetchTodoContext} from "../TodoContext/TodoContext";

import Loading from "../Loading/Loading";
import NotificationBox from "../NotificationBox/NotificationBox";

const time = Math.round(LOADER_TIME / 1000);

interface Props {
    children: ReactNode;
}

export default function FetchManager({children}: Props):JSX.Element {
    const fetchState = useContext(FetchTodoContext);

    const [toShowError, setToShowError] = React.useState(true);
    const hideError = useCallback(() => setToShowError(false), [setToShowError]);

    switch(fetchState) {
        case 'pending':
            return <Loading>
                <p>Loading task examples.</p>
                <p>Please wait {time} seconds minimum and watch this loader.</p>
            </Loading>;

        case 'error':
            return (
                <>
                    { toShowError && <NotificationBox
                        type="error"
                        message="Can`t fetch example tasks"
                        onClose={hideError}
                    /> }
                    {children}
                </>
            );

        case 'completed':
        default:
            return <>{children}</>;
    }
}