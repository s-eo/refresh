import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

import styles from "./Button.module.css";

type Variant = "primary" | "normal" | "outline" | "image";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
}

export default function Button({ variant = "primary", className, ...props }: ButtonProps) {
    return (
        <button
            className={clsx(styles.button, styles[variant], className)}
            {...props}
        />
    );
}
