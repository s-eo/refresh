import React from "react";

import styles from './NewTodoItem.module.css';
import plusIcon from "../assets/green-add-button.svg";

interface Props {
    name: string;
    onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    addTask: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function NewTodoItem({ name, onNameChange, addTask }: Props) {
    return (
        <div>
            <input
                name="name"
                type="text"
                value={name}
                onChange={onNameChange}
            />
            <button className={[styles.add, styles.button].join(" ")} onClick={addTask}><img className={styles.plus} src={plusIcon} alt="+"/>
            </button>
        </div>
    );
}
