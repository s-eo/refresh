import React, {ChangeEventHandler, useMemo, useState} from 'react';

import ToggleSwitch from "../UI/ToggleSwitch/ToggleSwitch";
import FunctionalityRow from "../FunctionalityRow/FunctionalityRow";
import {getInputDate} from "./helper";

import styles from './DeadlinePicker.module.css';

interface DeadlinePickerProps {
    deadline?: Date;
    handleDeadlineChange: ChangeEventHandler<HTMLInputElement>;
}

export default function DeadlinePicker({ deadline, handleDeadlineChange }: DeadlinePickerProps) {
    const [hasDeadline, setHasDeadline] = useState(false);

    const deadlineInput = useMemo<string | undefined>(() => getInputDate(deadline), [deadline])

    return (
        <FunctionalityRow>
            {hasDeadline && <input
                type="date"
                value={deadlineInput}
                onChange={handleDeadlineChange}
                className={styles.input}
            />}
            <ToggleSwitch
                name="dealinePicker"
                checked={hasDeadline}
                setChecked={setHasDeadline}
                optionLabels={["Has deadline", "No deadline"]}
                width={100}
            />
        </FunctionalityRow>
    );
}