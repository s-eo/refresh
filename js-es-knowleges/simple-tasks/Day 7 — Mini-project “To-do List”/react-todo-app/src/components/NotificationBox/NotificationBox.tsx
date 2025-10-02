import React from "react";
import clsx from "clsx";

import styles from "./NotificationBox.module.css";

interface NotificationBoxProps {
    type: "error" | "success" | "warning";
    message: string;
    onClose: () => void;
}

// ToDo: several notifications
const NotificationBox: React.FC<NotificationBoxProps> = ({ type, message, onClose }) => {
    return (
        <div className={styles.notificationContainer}>
            <div className={clsx(styles.notificationBox, styles[type])}>
                <span>{message}</span>
                <button className={styles.notificationClose} onClick={onClose}>
                    ×
                </button>
            </div>
        </div>
    );
};

export default NotificationBox;