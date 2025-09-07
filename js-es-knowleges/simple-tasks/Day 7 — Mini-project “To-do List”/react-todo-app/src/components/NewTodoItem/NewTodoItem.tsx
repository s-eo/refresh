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

    const handleAddingTask = ()=> {
        addTask(name);
        setName('');
    }
    return (
        <div>
            <input
                name="name"
                type="text"
                value={name}
                onChange={handleTextChange}
                placeholder="Add a new task"
                className={styles.name}
            />
            <button className={[styles.add, styles.button].join(" ")} onClick={handleAddingTask}><img className={styles.plus} src={plusIcon} alt="+"/>
            </button>
        </div>
    );
}
