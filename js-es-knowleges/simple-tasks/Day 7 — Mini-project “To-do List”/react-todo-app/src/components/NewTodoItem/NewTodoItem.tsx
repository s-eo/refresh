import React, {useState, useRef, RefObject, useCallback, useContext} from "react";

import Button from "../UI/Button/Button";
import styles from './NewTodoItem.module.css';
import FunctionalityRow from "../FunctionalityRow/FunctionalityRow";
import DeadlinePicker from "../DeadlinePicker/DeadlinePicker";
import {FetchTodoContext, useTodosDispatch} from '../TodoContext/TodoContext';


export default function NewTodoItem() {
    const [name, setName] = useState<string>('');
    const [deadline, setDeadline] = useState<Date | undefined>(undefined);
    const isDisabled = useContext(FetchTodoContext) === 'pending';

    const dispatch = useTodosDispatch() as Function;

    const nameRef = useRef<HTMLInputElement>(null);

    const addTask = (newTaskName: string)=> {
        dispatch({
            type: 'added',
            payload: {
                completed: false,
                title: newTaskName,
                ...(deadline && { deadline: String(deadline?.valueOf()) })
            },
        });
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
                    disabled={isDisabled}
                />
            </FunctionalityRow>
            <FunctionalityRow alignTop>
                <DeadlinePicker
                    deadline={deadline}
                    handleDeadlineChange={handleDeadlineChange}
                    isDisabled={isDisabled}
                />
                <Button
                    variant="primary"
                    type="submit"
                    disabled={isDisabled}
                    registerButtonRef={submitRefRegistrar}
                    className={[styles.button, styles.add].join(" ")}
                >+</Button>
            </FunctionalityRow>

        </form>
    );
}
