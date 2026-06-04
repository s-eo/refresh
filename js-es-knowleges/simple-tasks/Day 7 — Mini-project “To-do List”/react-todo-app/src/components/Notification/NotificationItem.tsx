import React, {
    ActionDispatch,
    MouseEventHandler,
    RefObject,
    useCallback,
    useEffect,
    useMemo,
    useRef
} from "react";
import clsx from "clsx";

import {notificationDispathType} from "./notificationReducer";
import RetryButton from "./RetryButton";
import {AppNotification} from "../../types/notification";

import errorIcon from "../../assets/exclamation.svg";
import styles from "./Notification.module.css";

const AUTO_DISMISS_DURATION = 5000;
const LEAVE_TRANSITION_DURATION = 1000;

interface NotificationItemProps{
    notification: AppNotification;
    dispatch: ActionDispatch<[notificationDispathType]>;
}

export default function NotificationItem({ notification, dispatch }: NotificationItemProps) {
    const {id, type, message, retryAction} = useMemo(() => notification, [notification]);

    const rootElement: RefObject<HTMLDivElement | null> = useRef(null);
    const closeNotification: MouseEventHandler<HTMLButtonElement> = useCallback(event => {
        const element: HTMLDivElement | null = rootElement.current;

        if (element) {
            element.classList.add(styles.leave);
            setTimeout(() => {
                dispatch({
                    type: 'remove',
                    payload: id
                });
            }, LEAVE_TRANSITION_DURATION);
        }
    }, [dispatch, rootElement, id]);
    const onRetry: MouseEventHandler<HTMLButtonElement> = useCallback(event => {
        retryAction && retryAction(event);
        closeNotification(event);
    }, [closeNotification, retryAction]);

    // Auto dismiss
    useEffect(() => {
        const timer = setTimeout(closeNotification, AUTO_DISMISS_DURATION);
        return () => clearTimeout(timer);
    }, [closeNotification]);

    return (
        <div
            ref={rootElement}
            className={clsx(styles.notificationCard, styles[type], `notification ${type}`)}
        >
            {type === 'error' && <img src={errorIcon} alt='!' className={styles.img}/>}

            <div className={styles.main}>
                <span>{message}</span>
                {typeof retryAction === 'function' &&
                    <RetryButton handleClick={onRetry}/>
                }
                <div className={styles.progress}/>
            </div>
            <button className={styles.close} onClick={closeNotification}>
                &times;
            </button>
        </div>
    )
        ;
}
