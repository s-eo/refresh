import React, {ComponentProps, MouseEventHandler} from "react";
import clsx from "clsx";

import styles from "./Notification.module.css";
import errorIcon from "../../assets/exclamation.svg";
import {GlobalNotificationType} from "../../types/notification";

interface NotificationCardProps extends ComponentProps<any> {
    id: string;
    type: GlobalNotificationType;
    message: string;
    onClose: MouseEventHandler<HTMLButtonElement>;
}
const NotificationCard: React.FC<NotificationCardProps> = ({ id, type, message, onClose, children, classList }) => {
    return (
        <div
            id={id}
            className={clsx(classList, styles.notificationCard, styles[type], `notification ${type}`)}
        >
            {type === 'error' && <img src={errorIcon} alt='!' className={styles.img}/>}

            <div className={styles.main}>
                <span>{message}</span>
                {children}
            </div>
            <button className={styles.close} onClick={onClose}>
                &times;
            </button>

        </div>
    );
};

export default NotificationCard;