import React, {useState} from "react";

import styles from './NewTodoItem.module.css';
import plusIcon from "../../assets/green-add-button.svg";

interface Props {
    addTask: (newName: string) => void;
}

export default function NewTodoItem({ addTask }: Props) {
    const [name, setName] = useState('');

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleAddingTask = (event: React.FormEvent)=> {
        event.preventDefault();

        if (!name.trim()) return;

        addTask(name);
        setName('');
    }

    return (
        <form onSubmit={handleAddingTask}>
            <input
                name="name"
                type="text"
                value={name}
                onChange={handleTextChange}
                placeholder="Add a new task"
                className={styles.name}
            />
            <button
                type="submit"
                className={[styles.add, styles.button].join(" ")}
            ><img className={styles.plus} src={plusIcon} alt="+"/>
            </button>
        </form>
    );
}
