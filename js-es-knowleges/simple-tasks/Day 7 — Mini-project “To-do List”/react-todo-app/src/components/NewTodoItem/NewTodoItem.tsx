import React, {useState} from "react";

import styles from './NewTodoItem.module.css';
import plusIcon from "../../assets/green-add-button.svg";
import {Todo} from "../../types/todo";

interface Props {
    setTasks: (tasks: Todo[]) => void;
    tasks: Todo[];
}

const getNextId = (tasks: Todo[]): number => {
    let maxId = 0;
    tasks.forEach(task => {
        if (task.id > maxId) {
            maxId = task.id;
        }
    })

    return ++maxId;
}

export default function NewTodoItem({ tasks, setTasks }: Props) {
    const [name, setName] = useState('');

    const addTask = (newTaskName: string)=> {
        setTasks([...tasks, { completed: false, title: newTaskName, id: getNextId(tasks) }]);
    }

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
