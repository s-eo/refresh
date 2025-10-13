import React, {MouseEventHandler} from "react";
import clsx from "clsx";

import styles from "./NotificationBox.module.css";
import errorIcon from "../../assets/exclamation.svg";

interface NotificationBoxProps {
    type: "error" | "success" | "warning";
    message: string;
    onClose: () => void;
    children?: React.ReactNode;
}

const NotificationBox: React.FC<NotificationBoxProps> = ({ type, message, onClose, children }) => {

    const handleClose: MouseEventHandler<HTMLButtonElement> = (event) => {
        if (event.target && event.target instanceof Element) {
            event.target.classList?.add("notification-leave");
            setTimeout(onClose, 250);
        }
    }

    return (
        <div className={styles.notificationContainer}>
            <div className={clsx(styles.notificationCard, styles[type])}>
                <div className={styles.notificationText}>
                    {type === 'error' && <img src={errorIcon} alt='!' className={styles.img} />}
                    <span>{message}</span>
                    <button className={styles.notificationClose} onClick={handleClose}>
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