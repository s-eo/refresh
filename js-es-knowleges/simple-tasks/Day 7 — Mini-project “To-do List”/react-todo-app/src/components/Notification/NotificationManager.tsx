import React, {
    ActionDispatch,
    ComponentProps,
    createContext,
    MouseEventHandler,
    useCallback,
    useReducer
} from "react";

import styles from "./Notification.module.css";
import NotificationCard from "./NotificationCard";
import notificationReducer from "./notificationReducer";
import RetryButton from "./RetryButton";

export const NotificationDispatchContext = createContext<ActionDispatch<[action: any]> | null>(null);

export default function NotificationManager({ children }: ComponentProps<any>) {
    const [notifications, dispatchNotifications] = useReducer(notificationReducer, []);

    const closeNotification= useCallback((id: number): MouseEventHandler<HTMLButtonElement>  => event => {
        const element = document.getElementById(`notif-${id}`);
        if (element) {
            element.classList.add(styles.leave);
            setTimeout(() => {
                dispatchNotifications({
                    type: 'remove',
                    payload: id
                });
            }, 250);
        }
    }, [dispatchNotifications]);
    const onRetry = useCallback((id: number, retryAction: Function): MouseEventHandler<HTMLButtonElement> => (event) => {
        retryAction(event);
        closeNotification(id)(event);
    }, [closeNotification])

    return (
        <NotificationDispatchContext value={dispatchNotifications}>
            {children}
            <div className={styles.notificationContainer}>
                {notifications.map((card) => (
                    <NotificationCard
                        key={card.id}
                        id={`notif-${card.id}`}
                        type={card.type}
                        message={card.message}
                        onClose={closeNotification(card.id)}
                    >
                        {typeof card.retryAction === 'function' &&
                            <RetryButton handleClick={onRetry(card.id, card.retryAction)}/>
                        }
                    </NotificationCard>
                ))}
            </div>
        </NotificationDispatchContext>
    )
        ;
}
