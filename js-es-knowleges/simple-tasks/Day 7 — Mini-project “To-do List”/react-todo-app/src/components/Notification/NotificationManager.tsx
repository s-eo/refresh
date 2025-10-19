import React, {
    ActionDispatch,
    ComponentProps,
    createContext,
    useReducer
} from "react";


import notificationReducer, {notificationDispathType} from "./notificationReducer";
import NotificationItem from "./NotificationItem";

import styles from "./Notification.module.css";

export const NotificationDispatchContext = createContext<ActionDispatch<[notificationDispathType]> | null>(null);

export default function NotificationManager({ children }: ComponentProps<any>) {
    const [notifications, dispatchNotifications] = useReducer(notificationReducer, []);

    return (
        <NotificationDispatchContext value={dispatchNotifications}>
            {children}
            <div className={styles.notificationContainer}>
                {notifications.map((card) => (
                    <NotificationItem
                        key={card.id}
                        notification={card}
                        dispatch={dispatchNotifications}
                    />
                ))}
            </div>
        </NotificationDispatchContext>
    )
        ;
}
