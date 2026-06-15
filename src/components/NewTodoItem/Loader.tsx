import React from "react";
import clsx from "clsx";

import styles from './NewTodoItem.module.css';

export default function NewItemLoader() {
    return (
        <div className={clsx(styles.wrapper, styles.loader)}>New task form is preparing...</div>
    );
}