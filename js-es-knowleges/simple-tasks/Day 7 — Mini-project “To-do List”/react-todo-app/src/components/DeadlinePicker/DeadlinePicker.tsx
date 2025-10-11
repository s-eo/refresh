import React, {ChangeEventHandler, useMemo, useState} from 'react';

import ToggleSwitch from "../UI/ToggleSwitch/ToggleSwitch";
import {getInputDate} from "./helper";

import styles from './DeadlinePicker.module.css';

interface DeadlinePickerProps {
    deadline?: Date;
    handleDeadlineChange: ChangeEventHandler<HTMLInputElement>;
    isDisabled?: boolean;
}

export default function DeadlinePicker({ deadline, handleDeadlineChange, isDisabled = false }: DeadlinePickerProps) {
    const [hasDeadline, setHasDeadline] = useState(false);

    const deadlineInput = useMemo<string | undefined>(() => getInputDate(deadline), [deadline])

    return (
        <div>
            <ToggleSwitch
                name="dealinePicker"
                checked={hasDeadline}
                setChecked={setHasDeadline}
                optionLabels={["Has deadline", "No deadline"]}
                width={100}
                isDisabled={isDisabled}
                className={styles.toggle}
            />
            {hasDeadline && <input
                type="date"
                value={deadlineInput}
                onChange={handleDeadlineChange}
                className={styles.input}
                disabled={isDisabled}
            />}
        </div>
    );
}