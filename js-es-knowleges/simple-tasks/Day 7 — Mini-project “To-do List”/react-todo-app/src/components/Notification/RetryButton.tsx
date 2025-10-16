import React, {MouseEventHandler} from "react";

import Button from "../UI/Button/Button";
import styles from "./Notification.module.css";

interface Props {
    handleClick: MouseEventHandler<HTMLButtonElement>;
}

export default function RetryButton({ handleClick }: Props) {
    return (
        <Button
            variant='notification'
            onClick={handleClick}
            className={styles.actions}
        >Try again &#x21BA;</Button>
    );
}