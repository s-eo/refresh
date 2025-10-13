import React, {ComponentProps} from "react";
import styles from "./NotificationBox.module.css";

export default function NotificationManager(props: ComponentProps<any>) {
    const [notifications, setNotifications] = React.useState([
        { id: 1, type: "error", message: "Can’t fetch example tasks" },
        { id: 2, type: "success", message: "Task added successfully" },
    ]);

    const closeNotification = (id: number) => {
        const element = document.getElementById(`notif-${id}`);
        if (element) {
            element.classList.add(styles.notificationLeave);
            setTimeout(() => {
                setNotifications((prev) => prev.filter((n) => n.id !== id));
            }, 250);
        }
    };

    return (
        <div className={styles.notificationContainer}>
            {notifications.map((n) => (
                <div
                    key={n.id}
                    id={`notif-${n.id}`}
                    className={[`notification ${n.type}`, styles.notificationCard, styles[n.type]].join(' ')}
                >
                    <div className={styles.notificationText}>
                        <p>{n.message}</p>
                        {n.type === "error" && (
                            <button className={styles.notificationActions}>Try again ↻</button>
                        )}
                    </div>
                    <button className={styles.notificationClose} onClick={() => closeNotification(n.id)}>
                        &times;
                    </button>
                </div>
            ))}
        </div>
    );
}
