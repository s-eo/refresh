import React, {ButtonHTMLAttributes, RefObject, useEffect, useRef} from "react";
import clsx from "clsx";

import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "danger" | "outline" | "notification" | "grouped";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    active?: boolean;
    registerButtonRef?: (ref: RefObject<HTMLButtonElement> | null) => void;
}

export default function Button({ variant = "primary", active = false, className, registerButtonRef, ...props }: ButtonProps) {

    const submitRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (registerButtonRef) {
            // @ts-ignore
            registerButtonRef(submitRef);
        }
    }, [submitRef, registerButtonRef]);

    return (
        <button
            className={clsx(styles.button, styles[variant], className, {
                [styles.active]: active,
            })}
            ref={submitRef}
            {...props}
        />
    );
}
