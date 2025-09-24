import React, {ButtonHTMLAttributes, RefObject, useCallback, useEffect, useRef} from "react";
import clsx from "clsx";

import styles from "./Button.module.css";

type Variant = "primary" | "danger" | "outline" | "image";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    registerButtonRef?: (ref: RefObject<HTMLButtonElement> | null) => void;
}

export default function Button({ variant = "primary", className, registerButtonRef, ...props }: ButtonProps) {

    const submitRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (registerButtonRef) {
            // @ts-ignore
            registerButtonRef(submitRef);
        }
    }, [submitRef]);

    return (
        <button
            className={clsx(styles.button, styles[variant], className)}
            ref={submitRef}
            {...props}
        />
    );
}
