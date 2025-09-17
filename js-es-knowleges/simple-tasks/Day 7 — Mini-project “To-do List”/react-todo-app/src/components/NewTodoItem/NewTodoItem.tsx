import React, {useState} from "react";

import {Todo} from "../../types/todo";

import plusIcon from "../../assets/plus.svg";
import Button from "../UI/Button/Button";
import styles from './NewTodoItem.module.css';

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
        <form
            onSubmit={handleAddingTask}
            className={styles.form}
        >
            <input
                name="name"
                type="text"
                value={name}
                onChange={handleTextChange}
                placeholder="Add a new task"
                className={styles.name}
            />
            <Button
                variant="primary"
                type="submit"
                className={[styles.add, styles.button].join(" ")}
            ><img className={styles.plus} src={plusIcon} alt="+"/>
            </Button>
        </form>
    );
}
