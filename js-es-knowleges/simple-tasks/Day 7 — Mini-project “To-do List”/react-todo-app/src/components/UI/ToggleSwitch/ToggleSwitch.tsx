import React, {ChangeEvent, useMemo} from 'react';

import styles from './ToggleSwitch.module.css';

interface ToggleSwitchProps {
    name: string;
    checked: boolean;
    setChecked: (checked: boolean) => void;
    optionLabels?: [string, string];
    width?: number;
}

function ToggleSwitch({ name, checked, setChecked, optionLabels=["Yes", "No"], width }: ToggleSwitchProps) {
    const handleToggleSwitch = (event: ChangeEvent<HTMLInputElement>) => setChecked(event.target.checked);
    const containerWidth = useMemo(() => (width ? width + 'px' : 'initial'), [width]);

    return (
        <div className={styles.container} style={{width: containerWidth}}>
            <input
                type="checkbox"
                className={styles.checkbox}
                name={name}
                id={name}
                checked={checked}
                onChange={handleToggleSwitch}
            />
            <label
                className={styles.label}
                htmlFor={name}
            >
                <span className={styles.inner}
                      data-yes={optionLabels[0]}
                      data-no={optionLabels[1]} />
                <span className={styles.switch} />
            </label>
        </div>
    );
}

export default ToggleSwitch;