import React from "react";
import clsx from "clsx";

import styles from "./NotificationBox.module.css";

interface NotificationBoxProps {
    type: "error" | "success" | "warning";
    message: string;
    onClose: () => void;
    children?: React.ReactNode;
}

// ToDo: several notifications
const NotificationBox: React.FC<NotificationBoxProps> = ({ type, message, onClose, children }) => {
    return (
        <div className={styles.notificationContainer}>
            <div className={clsx(styles.notificationBox, styles[type])}>
                <div className={styles.notificationText}>
                    <span>{message}</span>
                    <button className={styles.notificationClose} onClick={onClose}>
                        ×
                    </button>
                </div>

                {children && <div className={styles.notificationActions}>
                    {children}
                </div>}
            </div>
        </div>
    );
};

export default NotificationBox;