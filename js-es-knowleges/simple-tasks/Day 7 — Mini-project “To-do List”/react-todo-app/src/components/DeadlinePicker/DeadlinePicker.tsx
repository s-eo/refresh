import React, {ChangeEvent, useMemo, useState} from 'react';

import ToggleSwitch from "../UI/ToggleSwitch/ToggleSwitch";
import FunctionalityRow from "../FunctionalityRow/FunctionalityRow";
import {getInputDate} from "./helper";

import styles from './DeadlinePicker.module.css';

interface DeadlinePickerProps {
    deadline?: Date;
    setDeadline: (date?: Date) => void;
}

export default function DeadlinePicker({ setDeadline, deadline }: DeadlinePickerProps) {
    const [hasDeadline, setHasDeadline] = useState(false);

    const deadlineInput = useMemo<string | undefined>(() => getInputDate(deadline), [deadline])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setDeadline(e.target.valueAsDate || undefined);

    return (
        <FunctionalityRow>
            {hasDeadline && <input
                type="date"
                value={deadlineInput}
                onChange={handleChange}
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