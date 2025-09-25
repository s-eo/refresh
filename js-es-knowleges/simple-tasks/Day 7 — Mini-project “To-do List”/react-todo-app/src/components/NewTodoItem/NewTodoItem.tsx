import React, {useState, useRef, RefObject, useCallback} from "react";

import {Todo} from "../../types/todo";

import plusIcon from "../../assets/plus.svg";
import Button from "../UI/Button/Button";
import styles from './NewTodoItem.module.css';
import FunctionalityRow from "../FunctionalityRow/FunctionalityRow";
import DeadlinePicker from "../DeadlinePicker/DeadlinePicker";

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
    const [name, setName] = useState<string>('');
    const [deadline, setDeadline] = useState<Date | undefined>(undefined);

    const nameRef = useRef<HTMLInputElement>(null);

    const addTask = (newTaskName: string)=> {
        setTasks([...tasks, { completed: false, title: newTaskName, id: getNextId(tasks), deadline: String(deadline?.valueOf()) }]);
    }

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleAddingTask = (event: React.FormEvent)=> {
        event.preventDefault();

        if (!name.trim()) return;

        addTask(name);
        setDeadline(undefined);
        setName('');
        nameRef?.current?.focus();
    }

    const submitRef = useRef<HTMLButtonElement>(null);
    const submitRefRegistrar = (buttonRef: RefObject<HTMLButtonElement> | null) => {
        submitRef.current = buttonRef?.current || null;
    };
    
    const focusSubmit = useCallback(() => {
        submitRef?.current?.focus();
    }, [submitRef]);

    const handleDeadlineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDeadline(event.target.valueAsDate || undefined);
        focusSubmit && focusSubmit();
    }

    return (
        <form
            onSubmit={handleAddingTask}
            className={styles.form}
        >
            <FunctionalityRow className={styles.inputLine}>
                <input
                    name="name"
                    type="text"
                    value={name}
                    ref={nameRef}
                    onChange={handleTextChange}
                    placeholder="Add a new task"
                    className={styles.name}
                />
                <Button
                    variant="primary"
                    type="submit"
                    registerButtonRef={submitRefRegistrar}
                    className={[styles.add, styles.button].join(" ")}
                ><img className={styles.plus} src={plusIcon} alt="+"/>
                </Button>
            </FunctionalityRow>

            <DeadlinePicker
                deadline={deadline}
                handleDeadlineChange={handleDeadlineChange}
            />
        </form>
    );
}
